// booking is to show the user has successfully rented and payed for one of the apartment for some nights. it gives us the info of how many users would be in the apartment, how long they are staying for and how much they'll pay depending on their stay

import { model, Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    listing: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    status: {
      type: String,
      enum: ["requested", "confirmed", "declined", "expired", "cancelled"],
      default: "requested",
    },
    guest: {
      name: { type: String, required: true },
      email: { type: String, required: true, lowercase: true },
    },
    guests: { type: Number, required: true, min: 1 },
    nights: { type: Number, required: true, min: 1 },
    cleaningFee: { type: Number, default: 0 },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    expiresAt: { type: Date },
  },
  {
    timestamps: true,
  },
);

bookingSchema.index({ listing: 1, checkIn: 1 });
export const BLOCKING_STATUSES = ["requested", "confirmed"] as const;
export const Booking = model("Booking", bookingSchema);
