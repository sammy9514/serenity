import "dotenv/config";
import mongoose from "mongoose";
import { Listing } from "../models/listings.model";

// the client asked for the capital H
const names: Record<string, string> = {
  "serenity-waterfront-penthouse": "Serenity Waterfront 2 Bed Luxury PentHouse",
  "serenity-seafront-apartment": "Serenity Seafront 2 Bed Luxury PentHouse",
};

const run = async () => {
  await mongoose.connect(process.env.DATABASE_URI!);

  for (const [slug, name] of Object.entries(names)) {
    const listing = await Listing.findOneAndUpdate(
      { slug },
      { name },
      { returnDocument: "after" },
    );
    console.log(`${listing?.name} · £${listing?.pricePerNight}`);
  }

  // the room tag moved from Garden to Balcony
  const photos = await Listing.updateMany(
    { "photos.room": "Garden" },
    { $set: { "photos.$[photo].room": "Balcony" } },
    { arrayFilters: [{ "photo.room": "Garden" }] },
  );
  console.log(`listings with garden photos retagged: ${photos.modifiedCount}`);

  await mongoose.disconnect();
};

run();
