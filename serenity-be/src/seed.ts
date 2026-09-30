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
    bedrooms: 3,
    beds: 2,
    bathrooms: 2,
    pricePerNight: 500,
    sleeps: 6,
    description: ["hbjjjnkjkjkhjlnjkbhguyfcdghgjvhkbjbkhvgcfxdcgv hbjn"],
    minNights: 2,
    cleaningFee: 0,
    amenities: [
      { label: "Fast wifi", category: "Entertainment and services" },
      { label: "Smart TV", category: "Entertainment and services" },
      { label: "Self check-in lockbox", category: "Entertainment and services" },
      { label: "Free parking on site", category: "Entertainment and services" },
      { label: "Full oven and hob", category: "Kitchen" },
      { label: "Fridge freezer", category: "Kitchen" },
      { label: "Dishwasher", category: "Kitchen" },
      { label: "Washer and dryer", category: "Kitchen" },
      { label: "Cookware and tableware for 6", category: "Kitchen" },
      { label: "Ensuite with bathtub", category: "Bathrooms" },
      { label: "Walk-in shower", category: "Bathrooms" },
      { label: "Towels and toiletries", category: "Bathrooms" },
      { label: "Hairdryer", category: "Bathrooms" },
      { label: "King bed in master bedroom", category: "Living and bedrooms" },
      { label: "Large single in second bedroom", category: "Living and bedrooms" },
      { label: "Sofa bed in family room", category: "Living and bedrooms" },
      { label: "Blackout curtains", category: "Living and bedrooms" },
      { label: "Private garden with seating", category: "Outdoor" },
    ],
    photos: [
      { url: "", caption: "Living room", room: "Living room" },
      { url: "", caption: "Master bedroom", room: "Master bedroom" },
      { url: "", caption: "Kitchen", room: "Kitchen" },
      { url: "", caption: "Ensuite", room: "Bathrooms" },
      { url: "", caption: "Garden", room: "Garden" },
    ],
  },
  {
    slug: "apartment-2",
    name: "[Apartment 2 name]",
    summary: "2 bedrooms · 2 bathrooms · [what makes it different].",
    bedrooms: 3,
    beds: 2,
    bathrooms: 2,
    pricePerNight: 500,
    sleeps: 6,
    description: ["hbjjjnkjkjkhjlnjkbhguyfcdghgjvhkbjbkhvgcfxdcgv hbjn"],
    minNights: 2,
    cleaningFee: 0,
    amenities: [
      { label: "Fast wifi", category: "Entertainment and services" },
      { label: "Smart TV", category: "Entertainment and services" },
      { label: "Self check-in lockbox", category: "Entertainment and services" },
      { label: "Free parking on site", category: "Entertainment and services" },
      { label: "Full oven and hob", category: "Kitchen" },
      { label: "Fridge freezer", category: "Kitchen" },
      { label: "Dishwasher", category: "Kitchen" },
      { label: "Washer and dryer", category: "Kitchen" },
      { label: "Cookware and tableware for 6", category: "Kitchen" },
      { label: "Ensuite with bathtub", category: "Bathrooms" },
      { label: "Walk-in shower", category: "Bathrooms" },
      { label: "Towels and toiletries", category: "Bathrooms" },
      { label: "Hairdryer", category: "Bathrooms" },
      { label: "King bed in master bedroom", category: "Living and bedrooms" },
      { label: "Large single in second bedroom", category: "Living and bedrooms" },
      { label: "Sofa bed in family room", category: "Living and bedrooms" },
      { label: "Blackout curtains", category: "Living and bedrooms" },
      { label: "Private garden with seating", category: "Outdoor" },
    ],
    photos: [
      { url: "", caption: "Living room", room: "Living room" },
      { url: "", caption: "Master bedroom", room: "Master bedroom" },
      { url: "", caption: "Kitchen", room: "Kitchen" },
      { url: "", caption: "Ensuite", room: "Bathrooms" },
      { url: "", caption: "Garden", room: "Garden" },
    ],
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
    reference: "ddddd",
    accessToken: "SS-234df4",
  },
];
const insertedBooking = await Booking.insertMany(booking);
console.log(`seeded ${inserted.length} listings`);
console.log(`seeded ${insertedBooking.length} booking`);
await mongoose.disconnect();
