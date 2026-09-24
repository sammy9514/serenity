import AvailableApt from "./components/AvailableApt";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import WhyBookDirect from "./components/WhyBookDirect";

const App = () => {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <Hero />
      <div className=" mx-auto max-w-page px-6">
        <AvailableApt />
        <WhyBookDirect />
      </div>
      <Footer />
    </div>
  );
};

export default App;
