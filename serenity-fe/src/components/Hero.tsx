import Button from "./Button";

const Hero = () => {
  return (
    <section className="relative bg-taupe text-cream">
      <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/20 to-transparent" />
      <div className="relative mx-auto max-w-page px-6 flex flex-col justify-end md:flex-row md:justify-between md:items-end min-h-[70vh] py-20 ">
        <div className="max-w-2xl">
          <p className="text-sm text-taupe mb-3 uppercase tracking-widest ">
            Two serviced apartments in london
          </p>
          <h1 className="text-5xl md:text-6xl font-display">
            Spacious two-bedroom homes, ready for your stay
          </h1>
          <p className="mt-3 max-w-lg text-taupe">
            Each apartment sleeps six, with a full kitchen, private garden and
            parking. Book direct for the best rate.
          </p>
        </div>
        <div className="pt-6">
          <Button variant="primary">Book Now</Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
