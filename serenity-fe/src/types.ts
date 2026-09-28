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
  description: [string];
  minNights: number;
  instantBook: boolean;
}
