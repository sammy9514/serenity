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
          <p className="text-sm text-ink/70">Crossed-out dates are booked</p>
        </div>
        <div className="border border-line bg-cream p-10">
          <DayPicker
            mode="range"
            numberOfMonths={2}
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
