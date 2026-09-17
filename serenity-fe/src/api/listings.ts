import type { Listing } from "../types";
const API_URL = import.meta.env.VITE_API_URL;

export const fetchListings = async (): Promise<Listing[]> => {
  const res = await fetch(`${API_URL}/api/v1/listings`);
  if (!res.ok) throw new Error(`Failed to load data with ${res.status}`);
  const json = await res.json();
  return json.data;
};
