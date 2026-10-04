import "dotenv/config";
import mongoose from "mongoose";
import { connectDb } from "../utils/db";
import { Listing } from "../models/listings.model";

// the sleeping arrangements shown in "Where you'll sleep".
// the photo for each room is whichever photo is tagged with that room name.
const updates = [
  {
    slug: "serenity-waterfront-penthouse",
    rooms: [
      { name: "Master bedroom", beds: "1 king bed · ensuite · sleeps 2" },
      { name: "Second bedroom", beds: "2 single beds · sleeps 2" },
      { name: "Living room", beds: "1 double sofa bed · sleeps 2" },
    ],
  },
  {
    slug: "serenity-seafront-apartment",
    rooms: [
      { name: "Master bedroom", beds: "1 king bed · ensuite · sleeps 2" },
      { name: "Second bedroom", beds: "1 double bed · sleeps 2" },
      { name: "Living room", beds: "1 double sofa bed · sleeps 2" },
    ],
  },
];

await connectDb();

for (const { slug, rooms } of updates) {
  const result = await Listing.updateOne({ slug }, { $set: { rooms } });
  console.log(`${slug}: modified ${result.modifiedCount}`);
}

await mongoose.disconnect();
