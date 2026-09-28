import type { BookedRange, Listing } from "../types";
const API_URL = import.meta.env.VITE_API_URL;

export const fetchListings = async (): Promise<Listing[]> => {
  const res = await fetch(`${API_URL}/api/v1/listings`);
  if (!res.ok) throw new Error(`Failed to load data with ${res.status}`);
  const json = await res.json();
  return json.data;
};

export const fetchListing = async (slug: string): Promise<Listing> => {
  const res = await fetch(`${API_URL}/api/v1/listings/${slug}`);
  if (!res.ok) throw new Error("failed to load data");
  const json = await res.json();
  return json.data;
};

export const getAvailability = async (
  slug: string,
  from: string,
  to: string,
): Promise<BookedRange[]> => {
  const res = await fetch(
    `${API_URL}/api/v1/listings/${slug}/availability?from=${from}&to=${to}`,
  );
  if (!res.ok) throw new Error("availability not found");
  const json = await res.json();
  return json.data;
};
