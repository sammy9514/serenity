import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { fetchListing } from "../api/listings";

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
  return <div></div>;
};

export default Apartment;
