import { nightsBetween } from "../utils/dates";

export class BookingError extends Error {
  constructor(
    public code: "BAD_REQUEST" | "CONFLICT",
    message: string,
  ) {
    super(message);
  }
}
type QuotableListing = {
  pricePerNight: number;
  cleaningFee: number;
  minNights: number;
  sleeps: number;
};

export const computeQuote = (
  listing: QuotableListing,
  checkIn: Date,
  checkOut: Date,
  guests: number,
) => {
  const startOfToday = new Date();
  startOfToday.setUTCHours(0, 0, 0, 0);
  if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime()))
    throw new BookingError("BAD_REQUEST", "invalid dates");
  if (checkOut <= checkIn)
    throw new BookingError("BAD_REQUEST", "checkOut must be after checkIn");
  if (checkIn < startOfToday)
    throw new BookingError("BAD_REQUEST", "checkin is in the past");
  const nights = nightsBetween(checkIn, checkOut);
  if (nights < listing.minNights)
    throw new BookingError(
      "BAD_REQUEST",
      `minimum stay is ${listing.minNights} nights`,
    );
  if (guests < 1 || guests > listing.sleeps)
    throw new BookingError(
      "BAD_REQUEST",
      `guests must be between 1 and ${listing.sleeps}`,
    );

  const subtotal = nights * listing.pricePerNight;
  const cleaningFee = listing.cleaningFee;
  const total = subtotal + cleaningFee;
  const pricePerNight = listing.pricePerNight;

  return { nights, pricePerNight, cleaningFee, subtotal, total };
};
