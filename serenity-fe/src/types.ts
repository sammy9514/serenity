export interface Listing {
  _id: string;
  slug: string;
  name: string;
  summary: string;
  pricePerNight: number;
  sleeps: number;
  beds: number;
  bathrooms: number;
  bedrooms: number;
  description: string[];
  cleaningFee: number;
  minNights: number;
  instantBook: boolean;
  photos: { url: string; caption: string; room: string }[];
}

export type Booking = {
  reference: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  total: number;
  status: string;
  clientSecret: string;
};

export type BookedRange = {
  checkIn: string;
  checkOut: string;
};

export type BookingStatus =
  | "requested"
  | "confirmed"
  | "declined"
  | "expired"
  | "cancelled";

export type AdminBooking = {
  _id: string;
  reference: string;
  listing: { _id: string; name: string; slug: string };
  guest: { name: string; email: string };
  guests: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  cleaningFee: number;
  subtotal: number;
  total: number;
  status: BookingStatus;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
};
