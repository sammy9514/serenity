import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { fetchListing } from "../api/listings";
import ApartmentView from "../components/ApartmentView";
import AboutApartment from "../components/AboutApartment";
import BookingsQuote from "../components/BookingsQuote";
import WhereYouSleep from "../components/WhereYouSleep";
import VirtualTour from "../components/VirtualTour";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import MobileBookingBar from "../components/MobileBookingBar";
import { useState } from "react";
import WhereYouBe from "../components/WhereYouBe";
import ThingsToKnow from "../components/ThingsToKnow";
import Amenities from "../components/Amenities";

const Apartment = () => {
  const { slug } = useParams();
  const {
    data: listing,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["listing", slug],
    queryFn: () => fetchListing(slug!),
  });

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  if (isPending) return <p>Loading…</p>;
  if (isError) return <p>Couldn't load this apartment.</p>;
  return (
    <div className="max-w-page mx-auto px-4 pb-24 sm:px-6 lg:pb-0">
      <ApartmentView listing={listing} />
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_450px] gap-10 lg:gap-20">
        <div className="min-w-0">
          <AboutApartment listing={listing} />
          <WhereYouSleep />
          <VirtualTour listing={listing} />
          <AvailabilityCalendar
            listing={listing}
            checkIn={checkIn}
            checkOut={checkOut}
            onSelect={(from, to) => {
              setCheckIn(from);
              setCheckOut(to);
            }}
          />
          <Amenities listing={listing} />
          <WhereYouBe listing={listing} />
          <ThingsToKnow />
        </div>
        <div id="booking" className="min-w-0 scroll-mt-6">
          <BookingsQuote
            listing={listing}
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            setCheckIn={setCheckIn}
            setCheckOut={setCheckOut}
            setGuests={setGuests}
          />
        </div>
      </div>
      <MobileBookingBar
        listing={listing}
        checkIn={checkIn}
        checkOut={checkOut}
      />
    </div>
  );
};

export default Apartment;
