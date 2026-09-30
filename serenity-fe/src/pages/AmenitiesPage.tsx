import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { LuChevronLeft } from "react-icons/lu";
import { fetchListing } from "../api/listings";
import type { Listing } from "../types";
import { amenityIcon } from "../lib/amenityIcons";

type Amenity = Listing["amenities"][number];

const groupByCategory = (amenities: Amenity[]) => {
  const groups: { category: string; amenities: Amenity[] }[] = [];
  for (const amenity of amenities) {
    const existing = groups.find((g) => g.category === amenity.category);
    if (existing) existing.amenities.push(amenity);
    else groups.push({ category: amenity.category, amenities: [amenity] });
  }
  return groups;
};

const AmenitiesPage = () => {
  const { slug } = useParams();
  const {
    data: listing,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["listing", slug],
    queryFn: () => fetchListing(slug!),
  });

  if (isPending) return <p className="p-6">Loading…</p>;
  if (isError) return <p className="p-6">Couldn't load this apartment.</p>;

  const groups = groupByCategory(listing.amenities);

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-10 border-b border-line bg-cream">
        <div className="mx-auto flex max-w-4xl items-center px-4 py-3 sm:px-6">
          <Link
            to={`/apartments/${listing.slug}`}
            aria-label="Back to the apartment"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-taupe/40"
          >
            <LuChevronLeft />
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <h1 className="mt-10 font-display text-3xl sm:text-4xl">
          What this place offers
        </h1>
        <p className="mt-2 text-sm text-ink/70">
          {listing.amenities.length} amenities · {listing.name}
        </p>

        {groups.map((group) => (
          <section key={group.category} className="mt-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-ink/60">
              {group.category}
            </h2>
            <ul className="mt-3 flex flex-col">
              {group.amenities.map((amenity) => (
                <li
                  key={amenity.label}
                  className="flex items-center gap-3 border-b border-line py-3 text-sm"
                >
                  <span className="text-lg text-ink/70">
                    {amenityIcon(amenity.label)}
                  </span>
                  {amenity.label}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesPage;
