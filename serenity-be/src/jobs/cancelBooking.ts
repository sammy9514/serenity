import "dotenv/config";
import mongoose from "mongoose";
import { Booking } from "../models/booking.model";

const cancelBooking = async () => {
  const reference = process.argv[2]?.toUpperCase();
  if (!reference) {
    console.log("usage: npm run cancel-booking -- SS-XXXXXX");
    return;
  }

  await mongoose.connect(process.env.DATABASE_URI!);

  const booking = await Booking.findOne({ reference });

  if (!booking) {
    console.log(`${reference} not found`);
  } else if (booking.paymentIntentId) {
    // cancelling here would free the dates while the money sat in stripe
    console.log(
      `${reference} has a payment (${booking.paymentIntentId}). Refund it in Stripe instead, the webhook will cancel it.`,
    );
  } else if (booking.status === "cancelled") {
    console.log(`${reference} is already cancelled`);
  } else {
    await Booking.updateOne({ _id: booking._id }, { status: "cancelled" });
    console.log(`${reference}: ${booking.status} → cancelled, dates freed`);
  }

  await mongoose.disconnect();
};

cancelBooking();
