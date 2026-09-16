import { listings } from "../data/listing";
import Button from "./Button";

const AvailableApt = () => {
  return (
    <section className="mt-20  ">
      <div className=" flex flex-col md:flex-row justify-between mb-8 items-center">
        <h2 className="font-display text-3xl  ">Our apartments</h2>
        <p className="text-xs text-ink/70 ">Both sleeps 6 · minimum 2 nights</p>
      </div>
      <div className="grid grid-col-1 md:grid-cols-2 gap-10">
        {listings.map((apt) => (
          <div key={apt.id} className=" border border-line  ">
            <div className="w-full aspect-4/3 md:aspect-6/3 bg-ink text-taupe ">
              {apt.name}
            </div>
            <div className="p-5">
              <p className="text-xs">{apt.name}</p>
              <h3 className="font-display text-3xl my-1.5 ">Apartment</h3>
              <p className="text-xs pb-4">{apt.summary}</p>
              <div className="flex sm:justify-between flex-col gap-4 sm:flex-row ">
                <div className="flex gap-2 items-center">
                  <p className="text-4xl font-display ">£{apt.pricePerNight}</p>
                  <span className="text-xs">per night</span>
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary">View</Button>
                  <Button variant="primary">Book Now</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AvailableApt;
