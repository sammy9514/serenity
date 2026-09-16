import AvailableApt from "./components/AvailableApt";
import Header from "./components/Header";
import Hero from "./components/Hero";

const App = () => {
  return (
    <div className="w-full min-h-screen font-body">
      <Header />
      <Hero />
      <div className=" mx-auto max-w-page px-6 ">
        <AvailableApt />
      </div>
    </div>
  );
};

export default App;
