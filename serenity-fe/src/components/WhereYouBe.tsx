import { LuMapPin } from "react-icons/lu";

const WhereYouBe = () => {
  return (
    <section className="mt-12 border-t border-line pt-12">
      <h2 className="font-display text-3xl">Where you'll be</h2>

      <div className="mt-6 flex aspect-[16/7] items-center justify-center bg-taupe">
        <span className="flex items-center gap-2 text-sm text-ink/70">
          <LuMapPin />
          [Map · neighbourhood, city]
        </span>
      </div>

      <p className="mt-5 max-w-2xl leading-relaxed text-ink/80">
        [Two sentences about the area: nearest station, shops, how far to the
        centre.]
      </p>
    </section>
  );
};

export default WhereYouBe;
