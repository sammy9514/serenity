import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { LuChevronLeft, LuHeart, LuShare } from "react-icons/lu";
import { fetchListing } from "../api/listings";
import type { Listing } from "../types";

type Photo = Listing["photos"][number];

const groupByRoom = (photos: Photo[]) => {
  const groups: { room: string; photos: Photo[] }[] = [];
  for (const photo of photos) {
    const existing = groups.find((group) => group.room === photo.room);
    if (existing) existing.photos.push(photo);
    else groups.push({ room: photo.room, photos: [photo] });
  }
  return groups;
};

const Frame = ({ photo, wide = false }: { photo: Photo; wide?: boolean }) => (
  <figure>
    <img
      src={photo.url}
      alt={photo.caption}
      className={`w-full bg-taupe object-cover ${wide ? "aspect-[16/9]" : "aspect-[4/3]"}`}
    />
    <figcaption className="mt-2 text-xs uppercase tracking-widest text-ink/60">
      {photo.caption}
    </figcaption>
  </figure>
);

const Gallery = () => {
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

  const groups = groupByRoom(listing.photos);

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-10 border-b border-line bg-cream">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            to={`/apartments/${listing.slug}`}
            aria-label="Back to the apartment"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-taupe/40"
          >
            <LuChevronLeft />
          </Link>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="flex items-center gap-2 rounded-full px-3 py-2 text-sm underline underline-offset-4 hover:bg-taupe/40"
            >
              <LuShare />
              Share
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full px-3 py-2 text-sm underline underline-offset-4 hover:bg-taupe/40"
            >
              <LuHeart />
              Save
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <h1 className="mt-10 font-display text-3xl sm:text-4xl">
          {listing.name}
        </h1>
        <p className="mt-2 text-sm text-ink/70">
          {listing.photos.length} photos · {groups.length} rooms
        </p>

        {groups.map((group) => {
          const [first, ...rest] = group.photos;
          return (
            <section key={group.room} className="mt-14">
              <h2 className="font-display text-xl">{group.room}</h2>

              <div className="mt-4 flex flex-col gap-3">
                {first && <Frame photo={first} wide />}
                {rest.length > 0 && (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {rest.map((photo) => (
                      <Frame key={photo.caption} photo={photo} />
                    ))}
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
