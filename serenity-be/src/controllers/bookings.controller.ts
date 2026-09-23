import type { Request, Response } from "express";
import { Listing } from "../models/listings.model";
import {
  BookingError,
  computeQuote,
  findConflicts,
} from "../services/booking.service";
import { Booking } from "../models/booking.model";

export const quote = async (req: Request, res: Response) => {
  const { listingSlug, checkIn, checkOut, guests } = req.body;
  if (
    typeof listingSlug !== "string" ||
    typeof checkIn !== "string" ||
    typeof checkOut !== "string" ||
    typeof guests !== "number"
  )
    return res.status(400).json({
      error: { code: "BAD_REQUEST", message: "add correct values" },
    });

  const listing = await Listing.findOne({ slug: listingSlug });
  if (!listing)
    return res
      .status(404)
      .json({ error: { code: "NOT_FOUND", message: "listing not found" } });

  const quote = computeQuote(
    listing,
    new Date(checkIn),
    new Date(checkOut),
    guests,
  );
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const conflicts = await findConflicts(listing._id, checkInDate, checkOutDate);
  if (conflicts.length > 0)
    throw new BookingError("CONFLICT", "those dates are not available");
  return res.json({ data: quote });
};

export const createBooking = async (req: Request, res: Response) => {
  const { listingSlug, checkIn, checkOut, guest, guests } = req.body;
  if (typeof checkIn !== "string" || typeof checkOut !== "string")
    return res.status(400).json({
      error: {
        code: "BAD_REQUEST",
        message: "invalid date",
      },
    });
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  if (typeof listingSlug !== "string")
    return res.status(400).json({
      error: {
        code: "BAD_REQUEST",
        message: "slug must be string",
      },
    });
  if (typeof guests !== "number")
    return res.status(400).json({
      error: {
        code: "BAD_REQUEST",
        message: "guests must be number",
      },
    });

  if (typeof guest !== "object" || guest === null)
    return res.status(400).json({
      error: {
        code: "BAD_REQUEST",
        message: "uests name and email required",
      },
    });
  if (!guest.name || !guest.email)
    return res.status(400).json({
      error: {
        code: "BAD_REQUEST",
        message: "guests name and email required",
      },
    });

  const slug = listingSlug;

  const listing = await Listing.findOne({ slug });

  if (!listing)
    return res.status(404).json({
      error: {
        code: "NOT_FOUND",
        message: "listing not found",
      },
    });

  const quote = computeQuote(listing, checkInDate, checkOutDate, guests);
  //checks if selected date is available
  const conflicts = await findConflicts(listing._id, checkInDate, checkOutDate);

  if (conflicts.length > 0)
    throw new BookingError("CONFLICT", "those dates are not available");
  const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);

  //inserts your own your booking and await approval from client
  const booking = await Booking.create({
    listing: listing._id,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    status: "requested",
    guest,
    guests,
    nights: quote.nights,
    cleaningFee: quote.cleaningFee,
    subtotal: quote.subtotal,
    total: quote.total,
    expiresAt,
  });

  //rechecks db again is the date is still available else delete your booking
  const losers = await findConflicts(
    listing._id,
    checkInDate,
    checkOutDate,
    booking._id,
  );
  if (losers.length > 0) {
    await Booking.deleteOne({ _id: booking._id });
    throw new BookingError("CONFLICT", "date already taken");
  }
  return res.status(201).json({ data: booking });
};
