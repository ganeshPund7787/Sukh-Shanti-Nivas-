import { useQuery } from "react-query";
import { useSearchContext } from "../context/SearchContext";
import SearchHotels from "../API_Calls/SearchHotel";
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";

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

  const { data: hotelData } = useQuery(["SearchHotels", searchParams], () =>
    SearchHotels(searchParams)
  );

  console.log(hotelData);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-3 sticky h-fit top-10">
        <div className="space-y-5">
          <h1 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter By:{" "}
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels Found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
        </div>
        {hotelData?.data.map((hotel) => (
          <SearchResultsCard hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default Search;
