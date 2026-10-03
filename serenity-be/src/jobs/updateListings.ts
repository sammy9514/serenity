import "dotenv/config";
import mongoose from "mongoose";
import { connectDb } from "../utils/db";
import { Listing } from "../models/listings.model";

// one-off: the client's real names and per-guest pricing.
// updates in place so uploaded photos and amenities are kept.
const updates = [
  {
    matchSlug: "the-garden-flat",
    slug: "serenity-waterfront-penthouse",
    name: "Serenity Waterfront 2 Bed Luxury Penthouse",
    pricePerNight: 135,
    baseGuests: 2,
    extraGuestRate: 0.25,
  },
  {
    matchSlug: "the-upper-apartment",
    slug: "serenity-seafront-apartment",
    name: "Serenity Seafront View 2 Bed Luxury Apartment",
    pricePerNight: 140,
    baseGuests: 2,
    extraGuestRate: 0.25,
  },
];

await connectDb();

for (const { matchSlug, ...fields } of updates) {
  const result = await Listing.updateOne(
    { slug: matchSlug },
    { $set: fields },
  );
  console.log(
    `${matchSlug} -> ${fields.slug}: matched ${result.matchedCount}, modified ${result.modifiedCount}`,
  );
}

await mongoose.disconnect();
