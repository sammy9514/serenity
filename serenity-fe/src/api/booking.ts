import type { Booking, BookingSummary } from "../types";

type Quote = {
  nights: number;
  pricePerNight: number;
  cleaningFee: number;
  subtotal: number;
  total: number;
};

const API_URL = import.meta.env.VITE_API_URL;

export const getQuote = async (input: {
  listingSlug: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}): Promise<Quote> => {
  const res = await fetch(`${API_URL}/api/v1/bookings/quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message ?? "failed to load data");
  return json.data;
};

export const createBooking = async (input: {
  guest: { name: string; email: string; phoneNumber: string };
  listingSlug: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}): Promise<Booking> => {
  const res = await fetch(`${API_URL}/api/v1/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error.message ?? "couldn't create booking");
  return json.data;
};

export const fetchBookingByReference = async (
  reference: string,
  token: string,
): Promise<BookingSummary> => {
  const res = await fetch(
    `${API_URL}/api/v1/bookings/${reference}?token=${encodeURIComponent(token)}`,
  );
  const json = await res.json();

  if (!res.ok)
    throw new Error(json?.error?.message ?? "Could not find that booking");
  return json.data;
};
