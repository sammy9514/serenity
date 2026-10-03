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
  if (!res.ok)
    throw new Error(json?.error?.message ?? "Could not update this booking");
  return json.data;
};
export const declineBooking = async (id: string) => {
  const res = await fetch(`${API_URL}/api/v1/admin/bookings/${id}/decline`, {
    method: "PATCH",
    credentials: "include",
  });
  const json = await res.json();
  if (!res.ok)
    throw new Error(json?.error?.message ?? "Could not update this booking");
  return json.data;
};

export const uploadPhoto = async (input: {
  slug: string;
  file: File;
  caption: string;
  room: string;
}) => {
  const body = new FormData();
  body.append("photo", input.file);
  body.append("caption", input.caption);
  body.append("room", input.room);

  const res = await fetch(
    `${API_URL}/api/v1/admin/listings/${input.slug}/photos`,
    { method: "POST", credentials: "include", body },
  );
  const json = await res.json();
  if (!res.ok)
    throw new Error(json?.error?.message ?? "Could not upload that photo");
  return json.data;
};

export const deletePhoto = async (input: { slug: string; photoId: string }) => {
  const res = await fetch(
    `${API_URL}/api/v1/admin/listings/${input.slug}/photos/${input.photoId}`,
    { method: "DELETE", credentials: "include" },
  );
  const json = await res.json();
  if (!res.ok)
    throw new Error(json?.error?.message ?? "Could not delete that photo");
  return json.data;
};

export const makeCoverPhoto = async (input: {
  slug: string;
  photoId: string;
}) => {
  const res = await fetch(
    `${API_URL}/api/v1/admin/listings/${input.slug}/photos/${input.photoId}/cover`,
    { method: "PATCH", credentials: "include" },
  );
  const json = await res.json();
  if (!res.ok)
    throw new Error(json?.error?.message ?? "Could not update the order");
  return json.data;
};
