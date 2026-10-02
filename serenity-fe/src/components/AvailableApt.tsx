import { useQuery } from "@tanstack/react-query";
import Button from "./Button";
import { fetchListings } from "../api/listings";
import Photo from "./Photo";

const AvailableApt = () => {
  const {
    data: listings,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["listings"],
    queryFn: fetchListings,
  });

  return (
    <section id="apartments" className="mt-20 scroll-mt-28">
      <div className="mb-8 flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
        <h2 className="font-display text-3xl">Our apartments</h2>
        <p className="text-sm text-ink/70">Both sleep 6 · minimum 2 nights</p>
      </div>

      {isPending && <p className="text-sm text-ink/70">Loading apartments…</p>}
      {isError && (
        <p className="text-sm text-ink/70">
          Couldn't load apartments. Please try again shortly.
        </p>
      )}

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {listings?.map((apt) => {
          const cover = apt.photos?.[0];

          return (
            <article key={apt._id} className="flex flex-col border border-line">
              <Photo
                url={cover?.url}
                caption={cover?.caption ?? apt.name}
                className="aspect-4/3 w-full"
              />

              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-ink/60">
                  Sleeps {apt.sleeps} · {apt.bedrooms} bedrooms ·{" "}
                  {apt.bathrooms} bathrooms
                </p>
                <h3 className="my-1.5 font-display text-3xl">{apt.name}</h3>
                <p className="pb-5 text-sm text-ink/80">{apt.summary}</p>

                <div className="mt-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex items-baseline gap-2">
                    <span className="font-display text-3xl">
                      £{apt.pricePerNight}
                    </span>
                    <span className="text-sm text-ink/70">per night</span>
                  </p>
                  <div className="flex gap-3">
                    <Button variant="secondary" to={`/apartments/${apt.slug}`}>
                      View
                    </Button>
                    <Button to={`/apartments/${apt.slug}#booking`}>
                      Book now
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default AvailableApt;
