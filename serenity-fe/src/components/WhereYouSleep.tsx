import type { Listing } from "../types";
import Photo from "./Photo";

type Props = {
  listing: Listing;
};

const WhereYouSleep = ({ listing }: Props) => {
  const rooms = listing.rooms ?? [];
  if (rooms.length === 0) return null;

  return (
    <section className="mt-12 border-t border-line pt-12">
      <h2 className="font-display text-3xl">Where you'll sleep</h2>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {rooms.map((room) => {
          // the image is whichever photo the client tagged with this room
          const photo = listing.photos.find(
            (p) => p.room.toLowerCase() === room.name.toLowerCase(),
          );

          return (
            <div key={room.name}>
              <Photo
                url={photo?.url}
                caption={room.name}
                className="aspect-4/3 w-full"
                width={600}
              />
              <h3 className="mt-3 text-lg font-semibold">{room.name}</h3>
              <p className="text-sm text-ink/70">{room.beds}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhereYouSleep;
