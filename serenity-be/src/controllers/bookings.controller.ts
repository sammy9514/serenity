import type { Request, Response } from "express";
import { Listing } from "../models/listings.model";
import {
  BookingError,
  computeQuote,
  findConflicts,
} from "../services/booking.service";

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
