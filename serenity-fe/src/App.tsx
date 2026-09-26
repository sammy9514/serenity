import { Route, Routes } from "react-router";

import Apartment from "./pages/Apartment";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apartments/:slug" element={<Apartment />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
