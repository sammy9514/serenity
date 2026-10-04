import { useRef, useState } from "react";
import type { Listing } from "../types";
import Button from "./Button";
import Photo from "./Photo";
import { FiShare } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { LuChevronLeft, LuHeart } from "react-icons/lu";
import { Link, useNavigate } from "react-router";

type Props = {
  listing: Listing;
};

const ApartmentView = ({ listing }: Props) => {
  const hero = listing.photos[0];
  const thumbnails = listing.photos.slice(1, 5);
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const savedKey = `saved:${listing.slug}`;
  // read once at mount rather than in an effect, which would render twice
  const [saved, setSaved] = useState(
    () => localStorage.getItem(`saved:${listing.slug}`) === "1",
  );
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const toggleSaved = () => {
    const next = !saved;
    setSaved(next);
    if (next) localStorage.setItem(savedKey, "1");
    else localStorage.removeItem(savedKey);
  };

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: listing.name, url });
      } catch {
        // the guest dismissed the share sheet
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const goBack = () => {
    // history.length is 1 when the page was opened directly from a link
    if (window.history.length > 1) navigate(-1);
    else navigate("/#apartments");
  };

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
              <Photo
                url={photo.url}
                caption={photo.caption}
                className="aspect-4/3 w-full"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Go back"
          onClick={goBack}
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-cream shadow-sm active:scale-95"
        >
          <LuChevronLeft />
        </button>
        <div className="absolute right-4 top-4 flex gap-2">
          <button
            type="button"
            aria-label="Share this apartment"
            onClick={share}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-cream shadow-sm active:scale-95"
          >
            <FiShare />
          </button>
          <button
            type="button"
            aria-label={saved ? "Remove from saved" : "Save this apartment"}
            aria-pressed={saved}
            onClick={toggleSaved}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-cream shadow-sm active:scale-95"
          >
            <LuHeart className={saved ? "fill-ink text-ink" : ""} />
          </button>
        </div>

        <span className="absolute bottom-4 right-4 bg-ink px-3 py-2 text-xs font-bold text-cream">
          {index + 1} / {listing.photos.length}
        </span>
      </div>

      {/* title block: below the photo on phones, above the grid on desktop */}
      <div className="order-2 pt-6 md:order-1 md:pt-0">
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm font-bold uppercase tracking-widest text-ink/70">
          <span>{listing.bedrooms} bedrooms</span>
          <span>·</span>
          <span>{listing.bathrooms} bathrooms</span>
          <span>·</span>
          <span>Sleeps {listing.sleeps}</span>
        </div>
        <h1 className="my-3 font-display text-4xl sm:text-5xl lg:text-6xl">
          {listing.name}
        </h1>
        <div className="my-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm">
            <IoLocationOutline />
            {[listing.address?.town, listing.address?.postcode]
              .filter(Boolean)
              .join(" · ") || "Northfleet, Kent"}
          </div>
          <div className="hidden md:block">
            <Button variant="secondary" onClick={share}>
              <FiShare />
              {copied ? "Link copied" : "Share"}
            </Button>
          </div>
        </div>
      </div>

      {/* desktop: hero photo plus a four-photo grid */}
      <div className="order-3 hidden gap-4 md:grid md:grid-cols-4">
        <div className="md:col-span-2 md:row-span-2">
          {hero && (
            <Photo
              url={hero.url}
              caption={hero.caption}
              className="aspect-4/3 h-full w-full"
            />
          )}
        </div>
        <div className="relative grid grid-cols-2 gap-4 md:col-span-2 md:row-span-2 md:aspect-4/3">
          {thumbnails.map((photo) => (
            <Photo
              key={photo._id}
              url={photo.url}
              caption={photo.caption}
              className="aspect-4/3 w-full"
              width={600}
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
