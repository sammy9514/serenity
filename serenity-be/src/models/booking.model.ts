// booking is to show the user has successfully rented and payed for one of the apartment for some nights. it gives us the info of how many users would be in the apartment, how long they are staying for and how much they'll pay depending on their stay

import { model, Schema } from "mongoose";

// the single source of truth: the schema validates against these, and so do
// the admin filters, so the two can never drift apart
export const BOOKING_STATUSES = [
  "requested",
  "confirmed",
  "declined",
  "expired",
  "cancelled",
] as const;

export const PAYMENT_STATUSES = [
  "none",
  "pending",
  "authorised",
  "captured",
  "released",
  "refunded",
] as const;

const bookingSchema = new Schema(
  {
    listing: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    status: {
      type: String,
      enum: BOOKING_STATUSES,
      default: "requested",
    },
    guest: {
      name: { type: String, required: true },
      email: { type: String, required: true, lowercase: true },
      // a string: phone numbers have leading zeros and + prefixes
      phoneNumber: { type: String, required: true, trim: true },
    },
    guests: { type: Number, required: true, min: 1 },
    nights: { type: Number, required: true, min: 1 },
    cleaningFee: { type: Number, default: 0 },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    reference: { type: String, required: true, unique: true },
    accessToken: { type: String, required: true, unique: true, select: false },
    paymentIntentId: { type: String },
    paymentStatus: {
      type: String,
      enum: PAYMENT_STATUSES,
      default: "none",
    },
    expiresAt: { type: Date },
  },
  {
    timestamps: true,
  },
);

bookingSchema.index({ listing: 1, checkIn: 1 });
export const Booking = model("Booking", bookingSchema);
