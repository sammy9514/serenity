import { Link } from "react-router";
import Button from "./Button";
import type { Listing } from "../types";
import { amenityIcon } from "../lib/amenityIcons";

type Props = {
  listing: Listing;
};

const Amenities = ({ listing }: Props) => {
  const preview = listing.amenities.slice(0, 8);

  return (
    <section className="mt-12 border-t border-line pt-12">
      <h2 className="font-display text-3xl">What this place offers</h2>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {preview.map((amenity) => (
          <div key={amenity.label} className="flex items-center gap-3 text-sm">
            <span className="text-lg text-ink/70">
              {amenityIcon(amenity.label)}
            </span>
            {amenity.label}
          </div>
        ))}
      </div>

      {listing.amenities.length > preview.length && (
        <Link
          to={`/apartments/${listing.slug}/amenities`}
          className="mt-8 inline-grid"
        >
          <Button variant="secondary">
            Show all {listing.amenities.length} amenities
          </Button>
        </Link>
      )}
    </section>
  );
};

export default Amenities;
