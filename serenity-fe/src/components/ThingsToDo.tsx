import {
  LuWaves,
  LuShoppingBag,
  LuBike,
  LuTrees,
  LuDrama,
  LuLandmark,
  LuChurch,
  LuUmbrella,
  LuCastle,
  LuTrainFront,
  LuSunset,
} from "react-icons/lu";

const places = [
  {
    icon: <LuWaves />,
    name: "Thames riverside walks",
    detail:
      "Scenic walks along the river, watching ships travel towards the sea across the estuary.",
  },
  {
    icon: <LuShoppingBag />,
    name: "Bluewater Shopping Centre",
    distance: "10 minutes",
    detail:
      "Hundreds of shops and restaurants, a cinema and family entertainment.",
  },
  {
    icon: <LuBike />,
    name: "Cyclopark",
    distance: "10 minutes",
    detail:
      "Cycling circuits, mountain bike trails, a skate park and children's play areas.",
  },
  {
    icon: <LuTrees />,
    name: "Northfleet Urban Country Park",
    detail: "Green space for walking, jogging and birdwatching.",
  },
  {
    icon: <LuDrama />,
    name: "The Woodville, Gravesend",
    detail:
      "Live theatre, comedy, music and cinema screenings through the year.",
  },
  {
    icon: <LuLandmark />,
    name: "Historic Gravesend town centre",
    detail:
      "Riverside pubs, cafés and landmarks including the Pocahontas statue and St George's Church.",
  },
  {
    icon: <LuChurch />,
    name: "Guru Nanak Darbar Gurdwara",
    detail:
      "One of Europe's largest Sikh temples, known for its architecture and welcome.",
  },
  {
    icon: <LuUmbrella />,
    name: "Northfleet beach",
    detail:
      "An unusual riverside beach with views across the estuary and passing ships.",
  },
  {
    icon: <LuCastle />,
    name: "Tilbury Fort",
    detail:
      "Across the river, one of England's best-preserved riverside forts.",
  },
  {
    icon: <LuTrees />,
    name: "Shorne Woods Country Park",
    detail: "Woodland trails, picnic areas and family walks.",
  },
  {
    icon: <LuTrainFront />,
    name: "Day trips to London",
    detail:
      "Fast links from Ebbsfleet International and Northfleet for sightseeing, shopping and theatre.",
  },
];

const ThingsToDo = () => {
  return (
    <section id="things-to-do" className="scroll-mt-28">
      <div className="my-20 border-t border-line" />

      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-3xl">Things to do nearby</h2>
        <p className="text-sm text-ink/70">All within easy reach</p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
        {places.map((place) => (
          <div key={place.name} className="flex gap-3">
            <span className="mt-0.5 text-lg text-ink/70">{place.icon}</span>
            <span>
              <span className="block font-semibold">
                {place.name}
                {place.distance && (
                  <span className="font-normal text-ink/60">
                    {" "}
                    · {place.distance}
                  </span>
                )}
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-ink/80">
                {place.detail}
              </span>
            </span>
          </div>
        ))}
      </div>

      <div className="mt-10 flex gap-3 border border-line bg-taupe/30 p-5">
        <LuSunset className="mt-0.5 shrink-0 text-lg text-ink/70" />
        <p className="text-sm leading-relaxed">
          <span className="font-semibold">Guest favourite. </span>
          Don't miss sunset from the balcony. Watching the Thames meet the sea
          is the thing guests mention most.
        </p>
      </div>
    </section>
  );
};

export default ThingsToDo;
