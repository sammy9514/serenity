export interface Listing {
  _id: string;
  slug: string;
  name: string;
  summary: string;
  pricePerNight: number;
  sleeps: number;
  minNights: number;
  instantBook: boolean;
}
