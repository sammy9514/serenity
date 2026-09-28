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
};

export type BookedRange = {
  checkIn: string;
  checkOut: string;
};
