import Button from "./Button";

const Hero = () => {
  return (
    <section className="relative bg-taupe text-cream font-body">
      <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/20 to-transparent" />
      <div className="relative mx-auto max-w-page h-175 px-6 flex justify-between items-end py-20">
        <div className="max-w-2xl">
          <h4 className="text-sm text-taupe mb-3 uppercase tracking-widest ">
            Two serviced apartments in london
          </h4>
          <h2 className="text-6xl font-display">
            Spacious two-bedroom homes, ready for your stay
          </h2>
          <p className="mt-3 max-w-lg text-taupe">
            Each apartment sleeps six, with a full kitchen, private garden and
            parking. Book direct for the best rate.
          </p>
        </div>
        <Button variant="primary">Book Now"</Button>
      </div>
    </section>
  );
};

export default Hero;
