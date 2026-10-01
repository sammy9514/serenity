import { useRef, useState } from "react";
import type { Listing } from "../types";
import Button from "./Button";
import { FiShare } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { LuChevronLeft, LuHeart } from "react-icons/lu";
import { Link } from "react-router";

type Props = {
  listing: Listing;
};

const ApartmentView = ({ listing }: Props) => {
  const hero = listing.photos[0];
  const thumbnails = listing.photos.slice(1, 5);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };
  return (
    <section className="flex flex-col md:mt-10">
      {/* phone: full-bleed hero, replace the inner div with the carousel */}
      <div className="relative -mx-4 order-1 md:hidden">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex aspect-4/3 snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]"
        >
          {listing.photos.map((photo) => (
            <div key={photo._id} className="w-full shrink-0 snap-center">
              <img
                src={photo.url}
                alt={photo.caption}
                className="aspect-4/3 w-full object-cover"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Go back"
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-cream"
        >
          <LuChevronLeft />
        </button>
        <button
          type="button"
          aria-label="Save"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-cream"
        >
          <LuHeart />
        </button>

        <span className="absolute bottom-4 right-4 bg-ink px-3 py-2 text-xs font-bold text-cream">
          {index + 1} / {listing.photos.length}
        </span>
      </div>

      {/* title block: below the photo on phones, above the grid on desktop */}
      <div className="order-2 pt-6 md:order-1 md:pt-0">
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm font-bold uppercase tracking-widest text-ink/70">
          <span>{listing.name}</span>
          <span>·</span>
          <span>Sleeps {listing.sleeps}</span>
        </div>
        <h1 className="my-3 font-display text-4xl sm:text-5xl lg:text-6xl">
          A calm, light-filled home for your stay
        </h1>
        <div className="my-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm">
            <IoLocationOutline />
            [Neighbourhood, city]
          </div>
          <div className="hidden md:block">
            <Button variant="secondary">
              <FiShare />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* desktop: the four-photo grid */}
      <div className="order-3 hidden gap-4 md:grid md:grid-cols-4">
        <div className="aspect-4/3 bg-taupe md:col-span-2 md:row-span-2">
          {hero && (
            <img
              src={hero.url}
              alt={hero.caption}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="relative grid grid-cols-2 gap-4 md:col-span-2 md:row-span-2 md:aspect-4/3">
          {thumbnails.map((photo) => (
            <img
              key={photo._id}
              src={photo.url}
              alt={photo.caption}
              className="aspect-4/3 w-full bg-taupe object-cover"
            />
          ))}
          <Link
            to={`/apartments/${listing.slug}/gallery`}
            className="absolute bottom-3 right-3 border border-line bg-cream px-4 py-2 text-sm"
          >
            Show all {listing.photos.length} photos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ApartmentView;
