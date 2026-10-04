import { model, Schema } from "mongoose";

const listingsSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    summary: { type: String, required: true },
    // the nightly rate for up to baseGuests people
    pricePerNight: { type: Number, required: true, min: 0 },
    baseGuests: { type: Number, required: true, default: 2 },
    // each guest beyond baseGuests adds this share of the base rate
    extraGuestRate: { type: Number, required: true, default: 0.25 },
    sleeps: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    beds: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    minNights: { type: Number, required: true, min: 1 },
    description: { type: [String], required: true },
    instantBook: { type: Boolean, required: true, default: false },
    cleaningFee: { type: Number, default: 0 },
    photos: [{ url: String, caption: String, room: String, publicId: String }],
    amenities: [{ label: String, category: String }],
    address: {
      line1: String,
      line2: String,
      town: String,
      postcode: String,
    },
    tourVideoUrl: String,
  },
  { timestamps: true },
);

export const Listing = model("Listing", listingsSchema);
