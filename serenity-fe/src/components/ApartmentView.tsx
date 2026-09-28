import type { Listing } from "../types";
import Button from "./Button";
import { FiShare } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";

type Props = {
  listing: Listing;
};

const ApartmentView = ({ listing }: Props) => {
  const arr = ["Master bedroom", "Kitchen", "Ensuite", "Garden"];
  return (
    <div>
      <section className="mt-10">
        <div className="flex gap-2 uppercase ">
          <p className="font-bold text-ink text-sm ">{listing.name}</p>
          <span>·</span>
          <p className="font-bold text-ink text-sm ">Entire two bedroom flat</p>
          <span>·</span>
          <p className="font-bold text-ink text-sm ">sleeps {listing.sleeps}</p>
        </div>
        <h1 className="font-display text-6xl my-3 ">
          A calm, light-filled home for your stay
        </h1>
        <div className=" flex justify-between items-center my-5">
          <div className="flex gap-2 items-center ">
            <span>
              <IoLocationOutline />
            </span>
            London
          </div>
          <Button variant="secondary">
            <span>
              <FiShare />
            </span>
            Share
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-taupe aspect-4/3 col-span-2 row-span-2 p-3 flex items-end ">
            Living room
          </div>
          <div className="aspect-4/3 col-span-2 row-span-2 grid grid-cols-2 gap-4 relative ">
            {arr.map((arr, i: number) => (
              <div
                key={i}
                className="aspect-4/3 col-span-1 bg-taupe p-3 flex items-end"
              >
                {arr}
              </div>
            ))}
            <div className="border absolute right-4 bottom-4 px-6 py-3 ">
              show all pictures
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApartmentView;
