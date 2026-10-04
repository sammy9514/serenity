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
  {
    label: "Towels and linen provided",
    category: "Entertainment and services",
  },
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
      "Welcome to Serenity Waterfront 2-Bed Luxury Penthouse, an elegant riverside retreat offering breathtaking panoramic views of the River Thames as it flows towards the open sea. Perfectly positioned for relaxation and luxury living, this stunning penthouse combines contemporary comfort, sophisticated design, and spectacular waterfront scenery to create an unforgettable stay.",
      "Wake up each morning to sweeping views across the Thames Estuary and enjoy your coffee while watching ships and sailing boats pass by. Floor-to-ceiling windows flood the penthouse with natural light, creating a bright and inviting atmosphere throughout. As the day draws to a close, relax with a glass of wine and take in magnificent sunsets reflected across the water from the comfort of your private sanctuary.",
      "The penthouse features two beautifully appointed bedrooms designed to provide exceptional comfort and a restful night's sleep. The spacious open-plan living area offers stylish furnishings and ample space to unwind with family and friends. A fully equipped modern kitchen allows you to prepare everything from a leisurely breakfast to a gourmet dinner, while the elegant dining area provides a stunning backdrop for memorable meals overlooking the river.",

      "Whether you're planning a romantic getaway, a family holiday, a business trip, or a peaceful break from everyday life, Serenity Waterfront offers the perfect blend of tranquillity and convenience. Enjoy scenic riverside walks, explore nearby attractions, or simply relax and soak in the ever-changing beauty of the waterfront.",
      "This unique location provides a front-row seat to one of the United Kingdom's most iconic waterways. Watch the River Thames make its journey towards the sea, observe local birdlife and passing vessels, and experience the calming beauty of the surrounding landscape. The penthouse's elevated position ensures uninterrupted views that make every moment truly special.",
      "With premium amenities, luxurious furnishings, high-speed Wi-Fi, secure access, and thoughtfully designed spaces, every detail has been carefully considered to ensure a comfortable and memorable stay. Whether you're enjoying a peaceful morning overlooking the estuary or an evening under the glow of the waterfront lights, Serenity Waterfront 2-Bed Luxury Penthouse provides the perfect setting.",
      "Experience refined comfort, luxury, and tranquillity in an exceptional waterfront location. Book your stay at Serenity Waterfront 2-Bed Luxury Penthouse and discover a remarkable escape where the majestic River Thames meets the sea, creating the perfect backdrop for relaxation, exploration, and unforgettable memories.",
    ],
    pricePerNight: 135,
    baseGuests: 2,
    extraGuestRate: 0.25,
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
      "Welcome to Serenity Seafront View 2-Bed Luxury Apartment, a bright and contemporary home looking out across the Thames Estuary towards the sea.",
      "The open-plan living and dining area is the heart of the apartment, with large windows framing the water and plenty of room for six around the table.",
      "Two generous bedrooms are furnished for a proper night's sleep. Both bathrooms have walk-in showers, one of them ensuite to the master.",
      "Northfleet sits between the estuary and the Kent countryside, with Ebbsfleet International a short drive away for fast links to London.",
    ],
    pricePerNight: 140,
    baseGuests: 2,
    extraGuestRate: 0.25,
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
