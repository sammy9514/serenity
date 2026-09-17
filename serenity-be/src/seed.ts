import "dotenv/config";
import mongoose from "mongoose";
import { connectDb } from "./utils/db";
import { Listing } from "./model/listings.model";

const listings = [
  {
    slug: "apartment-1",
    name: "[Apartment 1 name]",
    summary: "2 bedrooms · 2 bathrooms · private garden · parking.",
    pricePerNight: 500,
    sleeps: 6,
    minNights: 2,
  },
  {
    slug: "apartment-2",
    name: "[Apartment 2 name]",
    summary: "2 bedrooms · 2 bathrooms · [what makes it different].",
    pricePerNight: 500,
    sleeps: 6,
    minNights: 2,
  },
];

await connectDb();
await Listing.deleteMany({});
const inserted = await Listing.insertMany(listings);
console.log(`seeded ${inserted.length} listings`);
await mongoose.disconnect();
