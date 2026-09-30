import { model, Schema } from "mongoose";

const listingsSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    summary: { type: String, required: true },
    pricePerNight: { type: Number, required: true, min: 0 },
    sleeps: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    beds: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    minNights: { type: Number, required: true, min: 1 },
    description: { type: [String], required: true },
    instantBook: { type: Boolean, required: true, default: false },
    cleaningFee: { type: Number, default: 0 },
    photos: [{ url: String, caption: String, room: String }],
  },
  { timestamps: true },
);

export const Listing = model("Listing", listingsSchema);
