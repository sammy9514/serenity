import "dotenv/config";
import mongoose from "mongoose";
import { stripe } from "../utils/stripe";
import { Booking } from "../models/booking.model";

// catches refunds made before the charge.refunded webhook existed, or any the
// webhook missed. safe to re-run: it only writes when the booking disagrees
// with stripe.
const run = async () => {
  await mongoose.connect(process.env.DATABASE_URI!);

  const charges = await stripe.charges.list({ limit: 100 });
  const refunded = charges.data.filter((charge) => charge.amount_refunded > 0);
  console.log(`refunded charges in stripe: ${refunded.length}`);

  for (const charge of refunded) {
    const paymentIntentId =
      typeof charge.payment_intent === "string"
        ? charge.payment_intent
        : charge.payment_intent?.id;
    if (!paymentIntentId) continue;

    const booking = await Booking.findOne({ paymentIntentId });
    if (!booking) {
      console.log(`no booking for ${paymentIntentId}, skipping`);
      continue;
    }

    const fullyRefunded = charge.amount_refunded === charge.amount;
    const wanted = {
      paymentStatus: "refunded",
      status: fullyRefunded ? "cancelled" : booking.status,
    };

    if (
      booking.paymentStatus === wanted.paymentStatus &&
      booking.status === wanted.status
    ) {
      console.log(`${booking.reference} already correct`);
      continue;
    }

    await Booking.updateOne({ _id: booking._id }, wanted);
    console.log(
      `${booking.reference}: ${booking.status}/${booking.paymentStatus} → ${wanted.status}/${wanted.paymentStatus}`,
    );
  }

  await mongoose.disconnect();
};

run();
