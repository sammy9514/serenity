import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useSearchParams } from "react-router";
import { fetchBookingByReference } from "../api/booking";
import type { BookingSummary } from "../types";
import { usePageMeta } from "../hooks/usePageMeta";

const messages: Record<BookingSummary["status"], string> = {
  requested:
    "Waiting for the host to confirm. Your card is authorised but has not been charged.",
  confirmed: "Confirmed. Your payment has been taken. See you soon.",
  declined:
    "These dates could not be confirmed. Nothing was charged to your card.",
  expired:
    "This request expired before it was confirmed. Nothing was charged to your card.",
  cancelled: "This booking was cancelled. Nothing was charged to your card.",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const BookingStatus = () => {
  usePageMeta({
    title: "Your booking · Serenity Space",
    path: "/bookings",
    noIndex: true,
  });

  const { reference } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const {
    data: booking,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["booking", reference, token],
    queryFn: () => fetchBookingByReference(reference!, token),
    enabled: Boolean(reference && token),
  });

  if (isPending) return <p className="p-6">Loading…</p>;
  if (isError)
    return (
      <p className="p-6">
        We couldn't find that booking. Please check the link in your email.
      </p>
    );

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-widest text-ink/60">
        Booking {booking.reference}
      </p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl">
        {booking.listing.name}
      </h1>
      <p className="mt-4 text-sm">{messages[booking.status]}</p>

      <dl className="mt-8 flex flex-col gap-3 border-t border-line pt-6 text-sm">
        <div className="flex justify-between">
          <dt className="text-ink/70">Dates</dt>
          <dd>
            {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink/70">Nights</dt>
          <dd>{booking.nights}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink/70">Guests</dt>
          <dd>{booking.guests}</dd>
        </div>
        <div className="flex justify-between border-t border-line pt-3 font-bold">
          <dt>Total</dt>
          <dd>£{booking.total}</dd>
        </div>
      </dl>

      <Link
        to={`/apartments/${booking.listing.slug}`}
        className="mt-8 inline-block text-sm underline underline-offset-4"
      >
        Back to the apartment
      </Link>
    </div>
  );
};

export default BookingStatus;
