import type { Listing } from "../types";

type Props = {
  listing: Listing;
  checkIn: string;
  checkOut: string;
};

const MobileBookingBar = ({ listing, checkIn, checkOut }: Props) => {
  const hasDates = Boolean(checkIn && checkOut);

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-cream px-4 py-3 lg:hidden">
      <div className="mx-auto flex max-w-page items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="font-display text-xl leading-none">
            £{listing.pricePerNight}
            <span className="ml-1 font-body text-xs text-ink/70">night</span>
          </span>
          <span className="text-xs text-ink/70">
            {hasDates ? `${checkIn} → ${checkOut}` : "Choose your dates"}
          </span>
        </div>

        <a
          href="#booking"
          className="bg-ink px-6 py-3 text-xs font-bold uppercase tracking-widest text-cream"
        >
          {hasDates ? "Book now" : "Check availability"}
        </a>
      </div>
    </div>
  );
};

export default MobileBookingBar;
