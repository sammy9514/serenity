import "dotenv/config";
import mongoose from "mongoose";
import { connectDb } from "./utils/db";
import { Listing } from "./models/listings.model";
import { Booking } from "./models/booking.model";
import { makeAccessToken, makeReference } from "./services/booking.service";

// placeholder content until the client sends his own copy and photos
const amenities = (extra: { label: string; category: string }[]) => [
  { label: "Fast wifi", category: "Entertainment and services" },
  { label: "Smart TV", category: "Entertainment and services" },
  { label: "Self check-in lockbox", category: "Entertainment and services" },
  { label: "Towels and linen provided", category: "Entertainment and services" },
  { label: "Full oven and hob", category: "Kitchen" },
  { label: "Fridge freezer", category: "Kitchen" },
  { label: "Dishwasher", category: "Kitchen" },
  { label: "Washer and dryer", category: "Kitchen" },
  { label: "Cookware and tableware for six", category: "Kitchen" },
  { label: "Walk-in shower", category: "Bathrooms" },
  { label: "Hairdryer", category: "Bathrooms" },
  { label: "Toiletries provided", category: "Bathrooms" },
  { label: "Blackout curtains", category: "Living and bedrooms" },
  { label: "Work desk", category: "Living and bedrooms" },
  { label: "Iron and ironing board", category: "Living and bedrooms" },
  ...extra,
];

const photos = (rooms: { caption: string; room: string }[]) =>
  rooms.map((r) => ({ url: "", caption: r.caption, room: r.room }));

const listings = [
  {
    slug: "the-garden-flat",
    name: "The Garden Flat",
    summary:
      "2 bedrooms · 2 bathrooms · private garden · parking on site. Quiet, bright and ten minutes from the station.",
    description: [
      "A calm two-bedroom flat on the ground floor, with its own garden and a parking space right beside the front door. It suits families, two couples sharing, or anyone working away who would rather have a home than a hotel room.",
      "The family room runs the width of the flat, with a large window onto the garden and a sofa that converts for two. The kitchen and dining area sit alongside it, fully fitted with an oven, hob, dishwasher, washer and dryer, and everything needed to cook properly for six.",
      "The master bedroom has a king bed and an ensuite with a bathtub and a walk-in shower. The second bedroom has two single beds and a desk under the window. The second bathroom is off the hallway.",
      "Check-in is from 3pm with a lockbox, so you can arrive whenever suits you. The garden is lit for evenings, and the parking space is yours for the whole stay.",
    ],
    pricePerNight: 185,
    cleaningFee: 45,
    sleeps: 6,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    minNights: 2,
    instantBook: false,
    amenities: amenities([
      { label: "Private garden with seating", category: "Outdoor" },
      { label: "Free parking on site", category: "Outdoor" },
      { label: "Bathtub in ensuite", category: "Bathrooms" },
      { label: "King bed in master bedroom", category: "Living and bedrooms" },
    ]),
    photos: photos([
      { caption: "Family room with garden view", room: "Living room" },
      { caption: "Master bedroom, king bed", room: "Master bedroom" },
      { caption: "Second bedroom, two singles", room: "Second bedroom" },
      { caption: "Kitchen and dining area", room: "Kitchen" },
      { caption: "Ensuite with bathtub", room: "Bathrooms" },
      { caption: "Garden seating in the evening", room: "Garden" },
    ]),
  },
  {
    slug: "the-upper-apartment",
    name: "The Upper Apartment",
    summary:
      "2 bedrooms · 2 bathrooms · top floor, double aspect · parking on site. Bright all day, with rooftop views.",
    description: [
      "A top-floor two-bedroom apartment with windows on two sides, so it holds the light from morning to evening. A short walk to the shops and about fifteen minutes to the centre.",
      "The open living and dining space has room for six around the table and a deep sofa that converts for two. The kitchen is fitted along one wall with an oven, hob, dishwasher, washer and dryer, and full cookware.",
      "The master bedroom has a king bed and built-in storage; the second has a double and a desk. Both bathrooms have walk-in showers, and one is ensuite to the master.",
      "Self check-in from 3pm with a lockbox, a parking space on site, and fast wifi throughout for anyone working from the table.",
    ],
    pricePerNight: 210,
    cleaningFee: 45,
    sleeps: 6,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    minNights: 2,
    instantBook: false,
    amenities: amenities([
      { label: "Double aspect windows", category: "Living and bedrooms" },
      { label: "Free parking on site", category: "Outdoor" },
      { label: "King bed in master bedroom", category: "Living and bedrooms" },
      { label: "Dining table for six", category: "Living and bedrooms" },
    ]),
    photos: photos([
      { caption: "Living and dining space", room: "Living room" },
      { caption: "Master bedroom, king bed", room: "Master bedroom" },
      { caption: "Second bedroom, double bed", room: "Second bedroom" },
      { caption: "Kitchen along the back wall", room: "Kitchen" },
      { caption: "Ensuite shower room", room: "Bathrooms" },
    ]),
  },
];

await connectDb();
await Listing.deleteMany({});
await Booking.deleteMany({});

const insertedListings = await Listing.insertMany(listings);
const gardenFlat = insertedListings[0]!;

const insertedBookings = await Booking.insertMany([
  {
    listing: gardenFlat._id,
    checkIn: new Date("2026-10-10"),
    checkOut: new Date("2026-10-15"),
    status: "confirmed",
    guest: { name: "Ada Mensah", email: "ada@example.com" },
    guests: 4,
    nights: 5,
    cleaningFee: 45,
    subtotal: 185 * 5,
    total: 185 * 5 + 45,
    reference: makeReference(),
    accessToken: makeAccessToken(),
    paymentStatus: "captured",
  },
]);

console.log(`seeded ${insertedListings.length} listings`);
console.log(`seeded ${insertedBookings.length} booking`);
await mongoose.disconnect();
