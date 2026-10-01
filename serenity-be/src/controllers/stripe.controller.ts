import type { Request, Response } from "express";
import type Stripe from "stripe";
import { stripe } from "../utils/stripe";
import { Booking } from "../models/booking.model";
import {
  sendHostNewRequest,
  sendRequestReceived,
} from "../services/email.service";

const paymentStatusFor = (eventType: string) => {
  switch (eventType) {
    case "payment_intent.amount_capturable_updated":
      return "authorised";
    case "payment_intent.succeeded":
      return "captured";
    case "payment_intent.canceled":
      return "released";
    default:
      return null;
  }
};

export const stripeWebhook = async (req: Request, res: Response) => {
  const signature = req.headers["stripe-signature"];
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (typeof signature !== "string" || !secret)
    return res.status(400).send("missing signature or secret");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, secret);
  } catch {
    return res.status(400).send("bad signature");
  }
  console.log("webhook:", event.type);

  const paymentStatus = paymentStatusFor(event.type);

  if (paymentStatus) {
    const intent = event.data.object as Stripe.PaymentIntent;
    const bookingId = intent.metadata?.bookingId;

    if (bookingId) {
      await Booking.updateOne({ _id: bookingId }, { paymentStatus });
      console.log(`booking ${bookingId} → ${paymentStatus}`);

      // the request only becomes real once the card is authorised
      if (paymentStatus === "authorised") {
        const booking = await Booking.findById(bookingId)
          .select("+accessToken")
          .populate<{ listing: { name: string } }>("listing", "name");

        if (booking?.guest) {
          const payload = {
            reference: booking.reference,
            accessToken: booking.accessToken,
            guest: { name: booking.guest.name, email: booking.guest.email },
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            nights: booking.nights,
            total: booking.total,
            listingName: booking.listing.name,
          };
          void sendRequestReceived(payload);
          void sendHostNewRequest(payload);
        }
      }
    }
  }

  return res.json({ received: true });
};
