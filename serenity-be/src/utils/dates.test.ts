import { describe, expect, it } from "vitest";
import { nightsBetween, rangesOverlap } from "./dates";

const d = (s: string) => new Date(s);

describe("nightsBetween", () => {
  it("counts night, not day", () => {
    expect(nightsBetween(d("2026-10-9"), d("2026-10-12"))).toBe(3);
  });
});

describe("rangesOverlap", () => {
  it("start day before previous ends overlap", () => {
    expect(
      rangesOverlap(
        d("2026-10-09"),
        d("2026-10-12"),
        d("2026-10-10"),
        d("2026-10-15"),
      ),
    ).toBe(true);
  });
  it(" back to back days dont overlap", () => {
    expect(
      rangesOverlap(
        d("2026-10-09"),
        d("2026-10-12"),
        d("2026-10-12"),
        d("2026-10-15"),
      ),
    ).toBe(false);
  });
  it(" back to back days dont overlap", () => {
    expect(
      rangesOverlap(
        d("2026-10-09"),
        d("2026-10-12"),
        d("2026-10-5"),
        d("2026-10-15"),
      ),
    ).toBe(true);
  });
});
