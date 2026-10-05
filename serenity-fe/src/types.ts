export interface Listing {
  _id: string;
  slug: string;
  name: string;
  summary: string;
  pricePerNight: number;
  baseGuests: number;
  extraGuestRate: number;
  sleeps: number;
  beds: number;
  bathrooms: number;
  bedrooms: number;
  description: string[];
  cleaningFee: number;
  minNights: number;
  instantBook: boolean;
  photos: {
    _id: string;
    url: string;
    caption: string;
    room: string;
    inHero?: boolean;
  }[];
  amenities: { label: string; category: string }[];
  address?: {
    line1?: string;
    line2?: string;
    town?: string;
    postcode?: string;
  };
  rooms?: { name: string; beds: string }[];
  tourVideoUrl?: string;
}

export type Booking = {
  reference: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  total: number;
  status: string;
  clientSecret: string;
  accessToken: string;
};
export type BookingStatues = {
  reference: string;
  status: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: string;
  total: number;
  listing: { _id: string; name: string; slug: string };
  expiresAt: string;
};

export type BookedRange = {
  checkIn: string;
  checkOut: string;
};

export type BookingStatus =
  "requested" | "confirmed" | "declined" | "expired" | "cancelled";

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

export type BookingSummary = {
  reference: string;
  status: BookingStatus;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  total: number;
  listing: { name: string; slug: string };
  expiresAt?: string;
};
