import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { addMonths, format, subDays } from "date-fns";
import type { Listing } from "../types";
import { getAvailability } from "../api/listings";
import { DayPicker } from "react-day-picker";

type Props = {
  listing: Listing;
  checkIn: string;
  checkOut: string;
  onSelect: (from: string, to: string) => void;
};

const AvailabilityCalendar = ({
  listing,
  checkIn,
  checkOut,
  onSelect,
}: Props) => {
  const [months, setMonths] = useState(
    typeof window !== "undefined" && window.innerWidth < 1024 ? 1 : 2,
  );

  useEffect(() => {
    const onResize = () => setMonths(window.innerWidth < 1024 ? 1 : 2);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const from = format(new Date(), "yyyy-MM-dd");
  const to = format(addMonths(new Date(), 6), "yyyy-MM-dd");

  const { data: booked } = useQuery({
    queryKey: ["availability", listing.slug, from, to],
    queryFn: () => getAvailability(listing.slug, from, to),
  });
  const disabled = (booked ?? []).map((b) => ({
    from: new Date(b.checkIn),
    to: subDays(new Date(b.checkOut), 1),
  }));
  return (
    <div>
      <section className="border-t border-line pt-12 mt-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-3xl">Availability</h2>
          <p className="text-sm text-ink/70 hidden md:block">
            Crossed-out dates are booked
          </p>
        </div>
        <div className="border border-line bg-cream p-4 sm:p-10 overflow-x-auto">
          <DayPicker
            mode="range"
            numberOfMonths={months}
            disabled={[...disabled, { before: new Date() }]}
            selected={{
              from: checkIn ? new Date(checkIn) : undefined,
              to: checkOut ? new Date(checkOut) : undefined,
            }}
            onSelect={(range) =>
              onSelect(
                range?.from ? format(range.from, "yyyy-MM-dd") : "",
                range?.to ? format(range.to, "yyyy-MM-dd") : "",
              )
            }
          />
        </div>
      </section>
    </div>
  );
};

export default AvailabilityCalendar;
