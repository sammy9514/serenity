import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Button from "./Button";
import { fetchListings } from "../api/listings";

const SLIDE_MS = 6000;

const Hero = () => {
  const { data: listings } = useQuery({
    queryKey: ["listings"],
    queryFn: fetchListings,
  });

  // one lead photo per apartment, so the hero shows both properties
  const slides = (listings ?? [])
    .map((listing) => listing.photos?.[0])
    .filter((photo): photo is NonNullable<typeof photo> => Boolean(photo?.url));

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % slides.length),
      SLIDE_MS,
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative bg-taupe text-cream">
      {slides.map((photo, i) => (
        <img
          key={photo.url}
          src={photo.url.replace(
            "/image/upload/",
            "/image/upload/c_fill,g_auto,f_auto,q_auto,w_2000/",
          )}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/30 to-ink/10" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-page flex-col justify-end px-6 py-20 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm uppercase tracking-widest text-taupe">
            Two luxury apartments on the Thames Estuary
          </p>
          <h1 className="font-display text-5xl md:text-6xl">
            Spacious two-bedroom homes, ready for your stay
          </h1>
          <p className="mt-3 max-w-lg text-taupe">
            Each apartment sleeps six, with a full kitchen, parking on site and
            views across the water. Book direct for the best rate.
          </p>
        </div>
        <div className="pt-6">
          <Button variant="primary" href="#apartments">
            See the apartments
          </Button>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((photo, i) => (
            <button
              key={photo.url}
              type="button"
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`h-2 w-8 transition-opacity ${
                i === index ? "bg-cream" : "bg-cream/40 hover:bg-cream/70"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;
