import { describe, expect, it } from "vitest";
import { computeQuote } from "./booking.service";

const listing = {
  pricePerNight: 500,
  sleeps: 6,
  minNights: 2,
  cleaningFee: 50,
};

const d = (s: string) => new Date(s);

describe("computeQuote", () => {
  it("prices a stays valid", () => {
    expect(computeQuote(listing, d("2026-11-02"), d("2026-11-04"), 3)).toEqual({
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
