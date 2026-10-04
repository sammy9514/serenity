import "dotenv/config";
import mongoose from "mongoose";
import { connectDb } from "../utils/db";
import { Listing } from "../models/listings.model";

// one-off: the client's own descriptions and addresses.
// updates in place so uploaded photos and amenities survive.
const updates = [
  {
    slug: "serenity-waterfront-penthouse",
    description: [
      "Welcome to Serenity Waterfront 2-Bed Luxury Penthouse, an elegant riverside retreat offering breathtaking panoramic views of the River Thames as it flows towards the open sea. Perfectly positioned for relaxation and luxury living, this stunning penthouse combines contemporary comfort, sophisticated design, and spectacular waterfront scenery to create an unforgettable stay.",
      "Wake up each morning to sweeping views across the Thames Estuary and enjoy your coffee while watching ships and sailing boats pass by. Floor-to-ceiling windows flood the penthouse with natural light, creating a bright and inviting atmosphere throughout. As the day draws to a close, relax with a glass of wine and take in magnificent sunsets reflected across the water from the comfort of your private sanctuary.",
      "The penthouse features two beautifully appointed bedrooms designed to provide exceptional comfort and a restful night's sleep. The spacious open-plan living area offers stylish furnishings and ample space to unwind with family and friends. A fully equipped modern kitchen allows you to prepare everything from a leisurely breakfast to a gourmet dinner, while the elegant dining area provides a stunning backdrop for memorable meals overlooking the river.",
      "Whether you're planning a romantic getaway, a family holiday, a business trip, or a peaceful break from everyday life, Serenity Waterfront offers the perfect blend of tranquillity and convenience. Enjoy scenic riverside walks, explore nearby attractions, or simply relax and soak in the ever-changing beauty of the waterfront.",
      "With premium amenities, luxurious furnishings, high-speed Wi-Fi, secure access, and thoughtfully designed spaces, every detail has been carefully considered to ensure a comfortable and memorable stay.",
    ],
    address: {
      line1: "38 Brunswick Heights",
      line2: "14 Henley Approach",
      town: "Northfleet",
      postcode: "DA11 9FX",
    },
  },
  {
    slug: "serenity-seafront-apartment",
    description: [
      "Welcome to Serenity Seafront View 2-Bed Luxury Apartment, a bright and contemporary home looking out across the Thames Estuary towards the sea. Thoughtfully designed and finished to a high standard, it offers space, calm and an outlook that changes with the tide and the light.",
      "The open-plan living and dining area is the heart of the apartment, with large windows framing the water and plenty of room for six around the table. Mornings here are quiet and full of light; evenings bring the glow of the estuary and the lights along the shoreline.",
      "Two generous bedrooms are furnished for a proper night's sleep, with crisp linen and blackout curtains. Both bathrooms have walk-in showers, one of them ensuite to the master. The fully equipped kitchen has everything needed to cook properly, from a quick breakfast to a long dinner with friends.",
      "It suits families, two couples sharing, or anyone working away who would rather have a home than a hotel room. High-speed Wi-Fi throughout, a dining table that doubles as a desk, secure entry and parking on site make longer stays easy.",
      "Northfleet sits between the estuary and the Kent countryside, with Ebbsfleet International a short drive away for fast links to London and the coast. Riverside walks, local shops and restaurants are all within easy reach, and the apartment itself is the quiet place to come back to.",
    ],
    address: {
      line1: "46 Estella Heights",
      line2: "10 Henley Approach",
      town: "Northfleet",
      postcode: "DA11 9FX",
    },
  },
];

await connectDb();

for (const { slug, ...fields } of updates) {
  const result = await Listing.updateOne({ slug }, { $set: fields });
  console.log(
    `${slug}: matched ${result.matchedCount}, modified ${result.modifiedCount}`,
  );
}

await mongoose.disconnect();
