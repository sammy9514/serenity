import "dotenv/config";
import mongoose from "mongoose";
import { connectDb } from "./utils/db";
import { Listing } from "./models/listings.model";
import { Booking } from "./models/booking.model";

const listings = [
  {
    slug: "apartment-1",
    name: "[Apartment 1 name]",
    summary: "2 bedrooms · 2 bathrooms · private garden · parking.",
    pricePerNight: 500,
    sleeps: 6,
    minNights: 2,
    cleaningFee: 0,
  },
  {
    slug: "apartment-2",
    name: "[Apartment 2 name]",
    summary: "2 bedrooms · 2 bathrooms · [what makes it different].",
    pricePerNight: 500,
    sleeps: 6,
    minNights: 2,
    cleaningFee: 0,
  },
];

await connectDb();
await Listing.deleteMany({});
await Booking.deleteMany({});
const inserted = await Listing.insertMany(listings);

const apartment1 = await inserted[0]!;

const booking = [
  {
    listing: apartment1._id,
    checkIn: new Date("2026-10-10"),
    checkOut: new Date("2026-10-15"),
    status: "confirmed",
    guest: {
      name: "anon",
      email: "anon@gmail.com",
    },
    guests: 2,
    nights: 5,
    cleaningFee: 0,
    subtotal: 500 * 5,
    total: 500 * 5 + 0,
  },
];
const insertedBooking = await Booking.insertMany(booking);
console.log(`seeded ${inserted.length} listings`);
console.log(`seeded ${insertedBooking.length} booking`);
await mongoose.disconnect();
