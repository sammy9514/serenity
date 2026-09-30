import { Route, Routes } from "react-router";

import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/Home";
import Apartment from "./pages/Apartment";
import Gallery from "./pages/Gallery";
import AdminLogin from "./pages/AdminLogin";
import AdminBooking from "./pages/AdminBooking";

const App = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/apartments/:slug" element={<Apartment />} />
      </Route>
      <Route path="/apartments/:slug/gallery" element={<Gallery />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminBooking />} />
    </Routes>
  );
};

export default App;
