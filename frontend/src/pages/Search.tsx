import { useQuery } from "react-query";
import { useSearchContext } from "../context/SearchContext";
import SearchHotels from "../API_Calls/SearchHotel";
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>();
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prevHoteltypes) =>
      event.target.checked
        ? [...prevHoteltypes, hotelType]
        : prevHoteltypes.filter((hotel) => hotel !== hotelType)
    );
  };

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page?.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
  };

  const { data: hotelData } = useQuery(["SearchHotels", searchParams], () =>
    SearchHotels(searchParams)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-3 sticky h-fit top-10">
        <div className="space-y-5">
          <h1 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter By:{" "}
          </h1>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
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
        <hr />
        {
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        }
      </div>
    </div>
  );
};

export default Search;
