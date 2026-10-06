import "dotenv/config";
import mongoose from "mongoose";
import { Listing } from "../models/listings.model";

const run = async () => {
  await mongoose.connect(process.env.DATABASE_URI!);

  const listing = await Listing.findOneAndUpdate(
    { slug: "serenity-seafront-apartment" },
    {
      name: "Serenity Seafront 2 Bed Luxury Penthouse",
      pricePerNight: 145,
    },
    { new: true },
  );
  console.log(`${listing?.name} · £${listing?.pricePerNight}`);

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
