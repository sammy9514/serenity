import { MdOutlineBathroom, MdOutlineBedroomChild } from "react-icons/md";
import type { Listing } from "../types";
import { LuCalendar, LuUsers } from "react-icons/lu";
type Props = {
  listing: Listing;
};

const AboutApartment = ({ listing }: Props) => {
  const facts = [
    {
      icon: <MdOutlineBedroomChild />,
      label: `${listing.bedrooms} bedrooms · ${listing.beds} beds`,
    },
    { icon: <MdOutlineBathroom />, label: `${listing.bathrooms} bathrooms` },
    { icon: <LuUsers />, label: `Sleeps ${listing.sleeps}` },
    { icon: <LuCalendar />, label: `Min ${listing.minNights} nights` },
  ];

  return (
    <div className=" ">
      <div className="flex gap-8 mt-10">
        {facts.map((fact) => (
          <div key={fact.label} className="flex items-center gap-3">
            {fact.icon}
            <span>{fact.label}</span>
          </div>
        ))}
      </div>
      <div className="my-10 border-t border-line " />
      <div className="flex gap-4 items-center">
        <div className="w-16 h-16 rounded-full bg-ink flex justify-center items-center text-white ">
          S
        </div>
        <div>
          <h3 className="font-semibold text-lg ">Hosted by [HOST NAME]</h3>
          <p className="text-sm ">
            Self check-in with a lockbox · Usually replies within an hour
          </p>
        </div>
      </div>
      <div className="my-10 border-t border-line " />

      <h2 className="font-display text-3xl ">About this apartment</h2>
      <p className=" mt-5">{listing.description}</p>
      <div className="my-10 border-t border-line " />
    </div>
  );
};

export default AboutApartment;
