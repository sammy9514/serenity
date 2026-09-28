import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { fetchListing } from "../api/listings";
import ApartmentView from "../components/ApartmentView";
import AboutApartment from "../components/AboutApartment";
import BookingsQuote from "../components/BookingsQuote";
import WhereYouSleep from "../components/WhereYouSleep";

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
  if (isPending) return <p>Loading…</p>;
  if (isError) return <p>Couldn't load this apartment.</p>;
  return (
    <div className="max-w-page mx-auto px-6 ">
      <ApartmentView listing={listing} />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-20 ">
        <div className="">
          <AboutApartment listing={listing} />
          <WhereYouSleep />
        </div>
        <BookingsQuote listing={listing} />
      </div>
    </div>
  );
};

export default Apartment;
