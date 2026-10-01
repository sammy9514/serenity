import { randomBytes, randomInt } from "crypto";
import { Booking } from "../models/booking.model";
import { nightsBetween } from "../utils/dates";
import { Types } from "mongoose";
import { stripe } from "../utils/stripe";
import {
  sendApproved,
  sendDeclined,
  sendExpired,
} from "./email.service";

export class BookingError extends Error {
  constructor(
    public code: "BAD_REQUEST" | "CONFLICT" | "NOT_FOUND",
    message: string,
  ) {
    super(message);
  }
}
type QuotableListing = {
  pricePerNight: number;
  cleaningFee: number;
  minNights: number;
  sleeps: number;
};

export const computeQuote = (
  listing: QuotableListing,
  checkIn: Date,
  checkOut: Date,
  guests: number,
) => {
  const startOfToday = new Date();
  startOfToday.setUTCHours(0, 0, 0, 0);
  if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime()))
    throw new BookingError("BAD_REQUEST", "invalid dates");
  if (checkOut <= checkIn)
    throw new BookingError("BAD_REQUEST", "checkOut must be after checkIn");
  if (checkIn < startOfToday)
    throw new BookingError("BAD_REQUEST", "checkin is in the past");
  const nights = nightsBetween(checkIn, checkOut);
  if (nights < listing.minNights)
    throw new BookingError(
      "BAD_REQUEST",
      `minimum stay is ${listing.minNights} nights`,
    );
  if (guests < 1 || guests > listing.sleeps)
    throw new BookingError(
      "BAD_REQUEST",
      `guests must be between 1 and ${listing.sleeps}`,
    );

  const subtotal = nights * listing.pricePerNight;
  const cleaningFee = listing.cleaningFee;
  const total = subtotal + cleaningFee;
  const pricePerNight = listing.pricePerNight;

  return { nights, pricePerNight, cleaningFee, subtotal, total };
};

export const findConflicts = (
  listingId: Types.ObjectId,
  checkIn: Date,
  checkOut: Date,
  opts: {
    beforeId?: Types.ObjectId;
    excludeId?: Types.ObjectId;
  } = {},
) => {
  const idFilter = {
    ...(opts.beforeId ? { $lt: opts.beforeId } : {}),
    ...(opts.excludeId ? { $ne: opts.excludeId } : {}),
  };
  const now = new Date();
  return Booking.find({
    listing: listingId,
    $or: [
      { status: "confirmed" },
      { status: "requested", expiresAt: { $gt: now } },
    ],
    checkIn: { $lt: checkOut },
    checkOut: { $gt: checkIn },
    ...(Object.keys(idFilter).length ? { _id: idFilter } : {}),
  }).select("checkIn checkOut -_id");
};

const emailPayload = async (bookingId: Types.ObjectId) => {
  const full = await Booking.findById(bookingId)
    .select("+accessToken")
    .populate<{ listing: { name: string } }>("listing", "name");

  if (!full?.guest) return null;

  return {
    reference: full.reference,
    accessToken: full.accessToken,
    guest: { name: full.guest.name, email: full.guest.email },
    checkIn: full.checkIn,
    checkOut: full.checkOut,
    nights: full.nights,
    total: full.total,
    listingName: full.listing.name,
  };
};

const notifyGuest = async (
  bookingId: Types.ObjectId,
  outcome: "approved" | "declined",
) => {
  const payload = await emailPayload(bookingId);
  if (!payload) return;

  if (outcome === "approved") await sendApproved(payload);
  else await sendDeclined(payload);
};

export const approveBooking = async (bookingId: string) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new BookingError("NOT_FOUND", "booking not found");
  if (booking.status !== "requested")
    throw new BookingError(
      "BAD_REQUEST",
      "only requested bookings can be approved",
    );
  const now = new Date();
  if (booking.expiresAt && booking.expiresAt < now)
    throw new BookingError("CONFLICT", "request has expired");
  const conflict = await findConflicts(
    booking.listing,
    booking.checkIn,
    booking.checkOut,
    { excludeId: booking._id },
  );
  if (conflict.length > 0)
    throw new BookingError("CONFLICT", "date is no longer available");
  if (booking.paymentIntentId) {
    await stripe.paymentIntents.capture(booking.paymentIntentId);
    booking.paymentStatus = "captured";
  }

  booking.status = "confirmed";
  booking.expiresAt = null;

  await booking.save();
  void notifyGuest(booking._id, "approved");
  return booking;
};

export const declineBooking = async (bookingId: string) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new BookingError("NOT_FOUND", "booking not found");
  if (booking.status !== "requested")
    throw new BookingError(
      "BAD_REQUEST",
      "only requested bookings can be declined",
    );

  if (booking.paymentIntentId) {
    await stripe.paymentIntents.cancel(booking.paymentIntentId);
    booking.paymentStatus = "released";
  }
  booking.status = "declined";
  await booking.save();
  void notifyGuest(booking._id, "declined");

  return booking;
};

const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export const makeReference = () =>
  "SS-" +
  Array.from({ length: 6 }, () => alphabet[randomInt(alphabet.length)]).join(
    "",
  );
export const makeAccessToken = () => randomBytes(32).toString("hex");

export const expireStaleRequests = async () => {
  const stale = await Booking.find({
    status: "requested",
    expiresAt: { $lt: new Date() },
  });

  let expired = 0;

  for (const booking of stale) {
    // one booking failing must not stop the rest of the batch
    try {
      if (booking.paymentIntentId) {
        await stripe.paymentIntents.cancel(booking.paymentIntentId);
        booking.paymentStatus = "released";
      }

      booking.status = "expired";
      await booking.save();
      expired += 1;

      const payload = await emailPayload(booking._id);
      if (payload) void sendExpired(payload);
    } catch (err) {
      console.error(`could not expire booking ${booking._id}`, err);
    }
  }

  return expired;
};
