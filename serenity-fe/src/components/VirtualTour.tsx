import { LuPlay } from "react-icons/lu";
import type { Listing } from "../types";

type Props = {
  listing: Listing;
};

const VirtualTour = ({ listing }: Props) => {
  return (
    <section
      id="tour"
      className="mt-12 scroll-mt-24 border-t border-line pt-12"
    >
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2 className="font-display text-3xl">Virtual tour</h2>
        <p className="text-sm text-ink/70">
          Walk through every room before you book
        </p>
      </div>

      {listing.tourVideoUrl ? (
        <video
          src={listing.tourVideoUrl}
          controls
          playsInline
          preload="metadata"
          className="mt-6 aspect-video w-full bg-ink"
        >
          Your browser cannot play this video.
        </video>
      ) : (
        <div className="mt-6 flex aspect-video items-center justify-center bg-taupe">
          <div className="flex flex-col items-center gap-3">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream">
              <LuPlay className="text-2xl" />
            </span>
            <p className="text-sm text-ink/70">Tour coming soon</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default VirtualTour;
