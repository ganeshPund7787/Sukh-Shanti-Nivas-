import { useQuery } from "react-query";
import { useSearchContext } from "../context/SearchContext";
import SearchHotels from "../API_Calls/SearchHotel";
import { useState } from "react";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>();

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page?.toString(),
  };

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () => {
    SearchHotels(searchParams);
    console.log(hotelData);
  });

  return <div>Search Page .............</div>;
};

export default Search;
