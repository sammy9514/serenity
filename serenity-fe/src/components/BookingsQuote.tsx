import React, { useState } from "react";
import type { Listing } from "../types";
import Button from "./Button";
import { LuLock } from "react-icons/lu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createBooking, getQuote } from "../api/booking";

type Props = {
  listing: Listing;
  checkIn: string;
  setCheckIn: (c: string) => void;
  setCheckOut: (c: string) => void;
  setGuests: (c: number) => void;
  checkOut: string;
  guests: number;
};

const BookingsQuote = ({
  listing,
  checkIn,
  checkOut,
  guests,
  setCheckIn,
  setCheckOut,
  setGuests,
}: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const {
    data: quote,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["quote", listing.slug, checkIn, checkOut, guests],
    queryFn: () =>
      getQuote({ listingSlug: listing.slug, checkIn, checkOut, guests }),
    enabled: Boolean(checkIn && checkOut),
    retry: false,
  });

  const {
    data,
    mutate,
    isPending,
    error: submitError,
  } = useMutation({
    mutationFn: createBooking,
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      listingSlug: listing.slug,
      checkIn,
      checkOut,
      guests,
      guest: { name, email },
    });
  };

  if (data) {
    return (
      <div className="sticky top-6 mt-10 flex flex-col gap-3 self-start border border-line bg-cream p-5">
        <h3 className="font-display text-2xl">Request sent</h3>
        <p className="text-sm">
          Reference <strong>{data.reference}</strong>
        </p>
        <p className="text-sm">
          {data.nights} nights · £{data.total}
        </p>
        <p className="text-sm text-ink/70">
          We'll email you within 48 hours to confirm.
        </p>
      </div>
    );
  }

  return (
    <div className="sticky top-6 mt-10 flex flex-col gap-3 self-start border border-line bg-cream p-5 text-sm">
      <div className="flex items-baseline gap-2">
        <span className="font-display text-3xl leading-none">
          £{listing.pricePerNight}
        </span>
        <span className="text-ink/70">per night</span>
      </div>

      <div className="grid grid-cols-2">
        <label className="flex flex-col border border-line px-3 py-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-ink/70">
            Check-in
          </span>
          <input
            type="date"
            className="bg-transparent text-sm outline-none"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </label>
        <label className="flex flex-col border border-l-0 border-line px-3 py-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-ink/70">
            Checkout
          </span>
          <input
            type="date"
            className="bg-transparent text-sm outline-none"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </label>
        <label className="col-span-2 flex flex-col border border-t-0 border-line px-3 py-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-ink/70">
            Guests
          </span>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="bg-transparent text-sm outline-none"
          >
            {Array.from({ length: listing.sleeps }, (_, i) => i + 1).map(
              (n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "guest" : "guests"}
                </option>
              ),
            )}
          </select>
        </label>
      </div>

      {isFetching && <p className="text-ink/70">Checking availability…</p>}
      {error && <p className="text-red-700">{error.message}</p>}

      {quote ? (
        <>
          <div className="flex flex-col gap-2 border-t border-line pt-3">
            <div className="flex justify-between">
              <span>
                £{listing.pricePerNight} × {quote.nights} nights
              </span>
              <span>£{quote.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Cleaning fee</span>
              <span>£{quote.cleaningFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t border-line pt-2 font-bold">
              <span>Total</span>
              <span>£{quote.total.toLocaleString()}</span>
            </div>
          </div>

          <form className="flex flex-col gap-3" onSubmit={onSubmit}>
            <div className="grid border border-line">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-b border-line px-3 py-2 outline-none"
                required
              />
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 outline-none"
                required
              />
            </div>
            {submitError && (
              <p className="text-red-700">{submitError.message}</p>
            )}
            <div className="grid">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Sending…" : "Book now"}
              </Button>
            </div>
          </form>
        </>
      ) : (
        <p className="text-ink/70">Choose your dates to see the total.</p>
      )}

      <p className="flex items-center justify-center gap-2 text-xs text-ink/60">
        <LuLock className="shrink-0" />
        You won't be charged yet
      </p>
    </div>
  );
};

export default BookingsQuote;
