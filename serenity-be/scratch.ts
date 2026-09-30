import { stripe } from "./src/utils/stripe";

const intent = await stripe.paymentIntents.create({
  amount: 155000,
  currency: "gbp",
  capture_method: "manual",
});
console.log(intent.id, intent.client_secret, intent.status);
