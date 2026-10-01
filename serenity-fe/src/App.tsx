import { Route, Routes } from "react-router";

import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/Home";
import Apartment from "./pages/Apartment";
import Gallery from "./pages/Gallery";
import AmenitiesPage from "./pages/AmenitiesPage";
import AdminLogin from "./pages/AdminLogin";
import AdminBooking from "./pages/AdminBooking";
import AdminPhotos from "./pages/AdminPhotos";
import BookingStatus from "./pages/BookingStatus";

const App = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/apartments/:slug" element={<Apartment />} />
      </Route>
      <Route path="/apartments/:slug/gallery" element={<Gallery />} />
      <Route path="/apartments/:slug/amenities" element={<AmenitiesPage />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminBooking />} />
      <Route
        path="/admin/listings/:slug/photos"
        element={<AdminPhotos />}
      />
      <Route path="/bookings/:reference" element={<BookingStatus />} />
    </Routes>
  );
};

export default App;
