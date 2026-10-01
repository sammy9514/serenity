import "dotenv/config";
import { stripe } from "./src/utils/stripe";

const intent = await stripe.paymentIntents.retrieve(
  "pi_3ULgUoRoN7FLfxz51DRxPKsJ",
); // from the newest booking in Mongo
console.log(intent.status, intent.amount, intent.capture_method);
