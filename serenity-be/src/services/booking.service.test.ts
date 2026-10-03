import { describe, expect, it } from "vitest";
import { computeQuote } from "./booking.service";

const listing = {
  pricePerNight: 500,
  sleeps: 6,
  minNights: 2,
  cleaningFee: 50,
  baseGuests: 2,
  extraGuestRate: 0.25,
};

const d = (s: string) => new Date(s);

describe("computeQuote", () => {
  it("prices a stays valid", () => {
    expect(computeQuote(listing, d("2026-11-02"), d("2026-11-04"), 2)).toEqual({
      nights: 2,
      pricePerNight: 500,
      cleaningFee: 50,
      subtotal: 1000,
      total: 1050,
    });
  });

  it("rejects stays shorter than minNights", () => {
    expect(() =>
      computeQuote(listing, d("2027-03-01"), d("2027-03-02"), 2),
    ).toThrow(/minimum stay/);
  });

  it("backward dates", () => {
    expect(() =>
      computeQuote(listing, d("2026-11-14"), d("2026-11-02"), 2),
    ).toThrow("checkOut must be after checkIn");
  });

  it("in the pasts", () => {
    expect(() =>
      computeQuote(listing, d("2026-09-01"), d("2026-09-04"), 2),
    ).toThrow("checkin is in the past");
  });

  it("too many guest", () => {
    expect(() =>
      computeQuote(listing, d("2026-11-01"), d("2026-11-04"), 9),
    ).toThrow("guests must be between 1 and 6");
  });
  it("too many guest", () => {
    expect(() =>
      computeQuote(listing, d("2026-11-01"), d("2026-11-04"), -1),
    ).toThrow("guests must be between 1 and 6");
  });
});

describe("per-guest pricing", () => {
  // two nights, the shortest stay the listing allows
  const rateFor = (guests: number) =>
    computeQuote(listing, d("2027-03-01"), d("2027-03-03"), guests)
      .pricePerNight;

  it("charges the base rate up to the base guest count", () => {
    expect(rateFor(1)).toBe(500);
    expect(rateFor(2)).toBe(500);
  });

  it("adds a quarter of the base rate for each extra guest", () => {
    expect(rateFor(3)).toBe(625);
    expect(rateFor(4)).toBe(750);
    expect(rateFor(6)).toBe(1000);
  });

  it("multiplies the guest-adjusted rate by the nights", () => {
    const quote = computeQuote(listing, d("2027-03-01"), d("2027-03-04"), 4);
    expect(quote.nights).toBe(3);
    expect(quote.subtotal).toBe(2250);
    expect(quote.total).toBe(2300);
  });
});
