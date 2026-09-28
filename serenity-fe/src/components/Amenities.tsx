import {
  LuWifi,
  LuTv,
  LuUtensils,
  LuCar,
  LuTrees,
  LuWashingMachine,
  LuBath,
  LuLock,
} from "react-icons/lu";
import Button from "./Button";

const amenities = [
  { icon: <LuWifi />, label: "Fast wifi" },
  { icon: <LuTv />, label: "Smart TV" },
  { icon: <LuUtensils />, label: "Full kitchen" },
  { icon: <LuCar />, label: "Free parking on site" },
  { icon: <LuTrees />, label: "Private garden" },
  { icon: <LuWashingMachine />, label: "Washer and dryer" },
  { icon: <LuBath />, label: "Bathtub in ensuite" },
  { icon: <LuLock />, label: "Self check-in lockbox" },
];

const Amenities = () => {
  return (
    <section className="mt-12 border-t border-line pt-12">
      <h2 className="font-display text-3xl">What this place offers</h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {amenities.map((amenity) => (
          <div key={amenity.label} className="flex items-center gap-3">
            <span className="text-lg">{amenity.icon}</span>
            <span>{amenity.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 inline-grid">
        <Button variant="secondary">Show all 18 amenities</Button>
      </div>
    </section>
  );
};

export default Amenities;
