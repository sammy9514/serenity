import type { Request, Response } from "express";
import { Listing } from "../models/listings.model";
import { BLOCKING_STATUSES, Booking } from "../models/booking.model";

export const getListings = async (req: Request, res: Response) => {
  const listings = await Listing.find().sort({ createdAt: 1 });
  res.json({
    data: listings,
  });
};

export const getAvailability = async (req: Request, res: Response) => {
  const { from, to } = req.query;
  if (typeof from !== "string" || typeof to !== "string") {
    return res.status(400).json({
      error: {
        code: "BAD_REQUEST",
        message: "from and to are required (yyyy-mm-dd)",
      },
    });
  }

  const fromDate = new Date(from);
  const toDate = new Date(to);

  if (
    Number.isNaN(fromDate.getTime()) ||
    Number.isNaN(toDate.getTime()) ||
    fromDate >= toDate
  ) {
    return res
      .status(400)
      .json({ error: { code: "BAD_REQUEST", message: "invalid date range" } });
  }
  const { slug } = req.params;
  if (!slug)
    return res
      .status(400)
      .json({ error: { code: "BAD_REQUEST", message: "slug is required" } });
  const listing = await Listing.findOne({ slug });

  if (!listing)
    return res
      .status(404)
      .json({ error: { code: "NOT_FOUND", message: "listing not found" } });

  const bookings = await Booking.find({
    listing: listing._id,
    status: { $in: BLOCKING_STATUSES },
    checkIn: { $lt: toDate },
    checkOut: { $gt: fromDate },
  }).select("checkIn checkOut -_id ");

  res.json({ data: bookings });
};
