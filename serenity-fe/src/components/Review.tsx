import { useState } from "react";
import { LuStar } from "react-icons/lu";

// taken from the client's Airbnb listing. static for now: when guests can
// review on this site these move to the database.
const reviews = [
  {
    name: "Chinyere",
    meta: "United Kingdom",
    rating: 5,
    stayed: "July 2026",
    comment:
      "It was a nice experience. Especially since it was a first time for me in an Airbnb.",
  },
  {
    name: "Shakur Abiodun",
    meta: "7 years on Airbnb",
    rating: 5,
    stayed: "July 2026",
    comment: "Stay was great, Tosin was very flexible and accommodating.",
  },
  {
    name: "Phil",
    meta: "4 years on Airbnb",
    rating: 5,
    stayed: "August 2026",
    comment: "Lovely place to stay close to the town and everything we needed.",
  },
  {
    name: "Akinkunmi",
    meta: "5 years on Airbnb",
    rating: 5,
    stayed: "June 2026",
    comment:
      "Recently stayed at Tosin's place with some friends. We had a fantastic few nights away from home. Amazing location and facilities.",
  },
  {
    name: "Masayo",
    meta: "10 years on Airbnb",
    rating: 5,
    stayed: "April 2026",
    comment:
      "Beautiful place. The view from the living room was amazing. Tosin was very accommodating and helpful. Would like to stay there again!",
  },
  {
    name: "Browngate Ltd",
    meta: "5 years on Airbnb",
    rating: 5,
    stayed: "February 2026",
    comment:
      "I had a fantastic stay at this Airbnb in Gravesend. The location is excellent, peaceful and scenic with beautiful views of the river, yet still conveniently close to local shops.",
  },
];

const TOTAL_REVIEWS = 19;
const AVERAGE = 5.0;

const Stars = ({ rating }: { rating: number }) => (
  <span className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <LuStar
        key={i}
        aria-hidden="true"
        className={`h-3.5 w-3.5 ${i < rating ? "fill-ink text-ink" : "text-line"}`}
      />
    ))}
  </span>
);

const Review = () => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? reviews : reviews.slice(0, 4);

  return (
    <section
      id="reviews"
      className="mt-12 scroll-mt-24 border-t border-line pt-12"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="flex items-center gap-3 font-display text-3xl">
          <LuStar className="h-5 w-5 fill-ink text-ink" />
          {AVERAGE.toFixed(1)} · {TOTAL_REVIEWS} reviews
        </h2>
        <p className="text-sm text-ink/70">From our guests on Airbnb</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {visible.map((review) => (
          <article key={`${review.name}-${review.stayed}`}>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-taupe font-display text-lg">
                {review.name.charAt(0)}
              </span>
              <span>
                <span className="block text-sm font-semibold">
                  {review.name}
                </span>
                <span className="block text-xs text-ink/60">{review.meta}</span>
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-ink/60">
              <Stars rating={review.rating} />
              <span>· {review.stayed}</span>
            </div>

            <p className="mt-2 text-sm leading-relaxed">{review.comment}</p>
          </article>
        ))}
      </div>

      {reviews.length > 4 && (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="mt-8 cursor-pointer border border-ink px-6 py-3 text-sm font-medium"
        >
          {showAll ? "Show fewer reviews" : `Show all ${TOTAL_REVIEWS} reviews`}
        </button>
      )}
    </section>
  );
};

export default Review;
