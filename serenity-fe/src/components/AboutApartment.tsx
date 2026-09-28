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
    <div>
      {/* phone: four columns, icon beside the number */}
      <div className="mt-6 grid grid-cols-4 gap-1 border-y border-line py-4 sm:hidden">
        {[
          {
            icon: <MdOutlineBedroomChild />,
            value: listing.bedrooms,
            label: "bedrooms",
          },
          {
            icon: <MdOutlineBathroom />,
            value: listing.bathrooms,
            label: "bathrooms",
          },
          { icon: <LuUsers />, value: listing.sleeps, label: "guests" },
          {
            icon: <LuCalendar />,
            value: listing.minNights,
            label: "min nights",
          },
        ].map((fact) => (
          <div key={fact.label} className="flex flex-col items-center gap-1">
            <span className="flex items-center gap-1.5">
              <span className="text-sm text-ink/70">{fact.icon}</span>
              <span className="font-display text-xl leading-none">
                {fact.value}
              </span>
            </span>
            <span className="text-center text-[10px] leading-tight text-ink/70">
              {fact.label}
            </span>
          </div>
        ))}
      </div>

      {/* desktop: icon row */}
      <div className="mt-10 hidden flex-wrap gap-8 sm:flex">
        {facts.map((fact) => (
          <div key={fact.label} className="flex items-center gap-3">
            {fact.icon}
            <span>{fact.label}</span>
          </div>
        ))}
      </div>
      <div className="my-10 " />
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
