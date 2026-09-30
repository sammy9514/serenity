import type { AdminBooking } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const admin = async (input: { email: string; password: string }) => {
  const res = await fetch(`${API_URL}/api/v1/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message ?? "could not login");
  return json.data;
};

export const fetchAdminBookings = async (
  status?: string,
): Promise<AdminBooking[]> => {
  const query = status ? `?status=${status}` : "";
  const res = await fetch(`${API_URL}/api/v1/admin/bookings${query}`, {
    credentials: "include",
  });
  const json = await res.json();
  if (!res.ok)
    throw new Error(json?.error?.message ?? "Could not load bookings");
  return json.data;
};

export const approveBooking = async (id: string) => {
  const res = await fetch(`${API_URL}/api/v1/admin/bookings/${id}/approve`, {
    method: "PATCH",
    credentials: "include",
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message ?? "Could not update this booking");
  return json.data;
};
export const declineBooking = async (id: string) => {
  const res = await fetch(`${API_URL}/api/v1/admin/bookings/${id}/decline`, {
    method: "PATCH",
    credentials: "include",
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message ?? "Could not update this booking");
  return json.data;
};
