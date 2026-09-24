import { BLOCKING_STATUSES, Booking } from "../models/booking.model";
import { nightsBetween } from "../utils/dates";
import { Types } from "mongoose";

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

  return Booking.find({
    listing: listingId,
    status: { $in: BLOCKING_STATUSES },
    checkIn: { $lt: checkOut },
    checkOut: { $gt: checkIn },
    ...(Object.keys(idFilter).length ? { _id: idFilter } : {}),
  }).select("checkIn checkOut -_id");
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
    throw new BookingError("CONFLICT", "date is no available");

  booking.status = "confirmed";
  booking.expiresAt = null;

  await booking.save();
  return booking;
};

export const declineBooking = async (bookingId: string) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new BookingError("NOT_FOUND", "booking not found");
  if (booking?.status !== "requested")
    throw new BookingError(
      "BAD_REQUEST",
      "only requested bookings can be declined",
    );
  booking.status = "declined";
  await booking.save();

  return booking;
};
