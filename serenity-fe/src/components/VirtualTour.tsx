import { LuPlay } from "react-icons/lu";

const VirtualTour = () => {
  return (
    <section className="mt-12 border-t border-line pt-12">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-3xl">Virtual tour</h2>
        <p className="text-sm text-ink/70 hidden md:block">
          Walk through every room before you book
        </p>
      </div>

      <div className="mt-6 flex aspect-video items-center justify-center bg-taupe">
        <div className="flex flex-col items-center gap-3">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream">
            <LuPlay className="text-2xl" />
          </span>
          <p className="text-sm text-ink/70">
            [360° tour or video walkthrough]
          </p>
        </div>
      </div>
    </section>
  );
};

export default VirtualTour;
