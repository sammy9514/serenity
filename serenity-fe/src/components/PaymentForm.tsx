import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { stripePromise } from "../lib/stripe";
import React, { useState } from "react";
import Button from "./Button";

type Props = {
  clientSecret: string;
  reference: string;
  total: number;
  onPaid: () => void;
};
const PaymentForm = ({ onPaid }: { onPaid: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError("");

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    setSubmitting(false);
    if (error) setError(error.message ?? "Payment failed");
    else onPaid();
  };
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <PaymentElement />
      {error && <p className="text-sm text-red-700">{error}</p>}
      <Button type="submit" disabled={!stripe || submitting}>
        {submitting ? "Authorising…" : "Authorise and send request"}
      </Button>
      <p className="text-xs text-ink/60">
        Your card won't be charged until the host confirms.
      </p>
    </form>
  );
};

const PaymentSteps = ({ clientSecret, onPaid }: Props) => {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm onPaid={onPaid} />
    </Elements>
  );
};
export default PaymentSteps;
