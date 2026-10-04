import { LuMapPin } from "react-icons/lu";
import type { Listing } from "../types";

type Props = {
  listing: Listing;
};

const WhereYouBe = ({ listing }: Props) => {
  const address = listing.address;
  const lines = [address?.town, address?.postcode].filter(Boolean);

  // the postcode alone places the pin accurately enough without publishing
  // the flat number to anyone browsing
  const query = encodeURIComponent(
    [address?.town, address?.postcode].filter(Boolean).join(" ") ||
      "Northfleet",
  );

  return (
    <section
      id="location"
      className="mt-12 scroll-mt-24 border-t border-line pt-12"
    >
      <h2 className="font-display text-3xl">Where you'll be</h2>

      <div className="mt-6 overflow-hidden border border-line">
        <iframe
          title={`Map showing ${listing.name}`}
          src={`https://www.google.com/maps?q=${query}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="aspect-[16/9] w-full border-0"
        />
      </div>

      {lines.length > 0 && (
        <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed">
          <LuMapPin className="mt-0.5 shrink-0 text-ink/60" />
          <span>
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </span>
        </p>
      )}

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/80">
        Northfleet sits on the Thames Estuary in Kent, with Ebbsfleet
        International a short drive away for fast trains to London. The full
        address and access details are sent once your booking is confirmed.
      </p>
    </section>
  );
};

export default WhereYouBe;
