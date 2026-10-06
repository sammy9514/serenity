import AvailableApt from "../components/AvailableApt";
import Hero from "../components/Hero";
import ThingsToDo from "../components/ThingsToDo";
import { usePageMeta } from "../hooks/usePageMeta";

const Home = () => {
  usePageMeta({
    title:
      "Serenity Space Luxury Homes · Two-bedroom apartments in Northfleet, Kent",
    description:
      "Two luxury two-bedroom penthouse apartments on the Thames Estuary in Northfleet, Kent. Sleeps six, parking on site. Book direct for the best rate.",
    path: "/",
  });

  return (
    <div className="w-full min-h-screen">
      <Hero />
      <div className=" mx-auto max-w-page px-6">
        <AvailableApt />
        <ThingsToDo />
      </div>
    </div>
  );
};

export default Home;
