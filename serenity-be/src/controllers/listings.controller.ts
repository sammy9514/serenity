import type { Request, Response } from "express";
import { Listing } from "../model/listings.model";

export const getListings = async (req: Request, res: Response) => {
  const listings = await Listing.find().sort({ createdAt: 1 });
  res.json({
    data: listings,
  });
};
