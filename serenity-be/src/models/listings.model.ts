import { model, Schema } from "mongoose";

const listingsSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    summary: { type: String, required: true },
    pricePerNight: { type: Number, required: true, min: 0 },
    sleeps: { type: Number, required: true },
    minNights: { type: Number, required: true, min: 1 },
    instantBook: { type: Boolean, required: true, default: false },
    cleaningFee: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Listing = model("Listing", listingsSchema);
