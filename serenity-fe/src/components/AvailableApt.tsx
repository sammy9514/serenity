import { listing } from "../data/listing";
import Button from "./Button";

const AvailableApt = () => {
  return (
    <section className="mt-20  ">
      <div className=" flex justify-between mb-8 items-center">
        <h2 className="font-display text-3xl  ">Our apartments</h2>
        <p className="text-xs text-ink/70 ">Both sleeps 6 · minimum 2 nights</p>
      </div>
      <div className="grid grid-cols-2 gap-10">
        {listing.map((ap, i: number) => (
          <div key={ap.id} className=" border border-line  ">
            <div className="w-full aspect-6/3 bg-ink text-taupe ">
              {ap.name}
            </div>
            <div className="p-5">
              <p className="text-xs">{ap.name}</p>
              <h3 className="font-display text-3xl my-1.5 ">Apartment</h3>
              <p className="text-xs">{ap.summary}</p>
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <p className="text-4xl font-display ">£{ap.pricePerNight}</p>
                  <span className="text-xs">per night</span>
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary">View</Button>
                  <Button variant="primary">Book Now"</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="my-20 border-t border-line " />
      <div className="grid grid-cols-3 gap-10">
        <div>
          <h4 className="font-display text-2xl ">Best rate, booked direct</h4>
          <p className="text-xs">
            No platform fees. The price you see is the price you pay.
          </p>
        </div>
        <div>
          <h4 className="font-display text-2xl ">Best rate, booked direct</h4>
          <p className="text-xs">
            No platform fees. The price you see is the price you pay.
          </p>
        </div>
        <div>
          <h4 className="font-display text-2xl ">Best rate, booked direct</h4>
          <p className="text-xs">
            No platform fees. The price you see is the price you pay.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AvailableApt;
