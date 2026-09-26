import AvailableApt from "../components/AvailableApt";
import Hero from "../components/Hero";
import WhyBookDirect from "../components/WhyBookDirect";

const Home = () => {
  return (
    <div className="w-full min-h-screen">
      <Hero />
      <div className=" mx-auto max-w-page px-6">
        <AvailableApt />
        <WhyBookDirect />
      </div>
    </div>
  );
};

export default Home;
