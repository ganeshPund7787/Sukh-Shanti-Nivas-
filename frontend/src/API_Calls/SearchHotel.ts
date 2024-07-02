import { HotelSearchResponce } from "../../../backend/src/shared/types";
import { API_URL } from "../main";

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOptions?: string;
};

const SearchHotels = async (
  SearchParams: SearchParams
): Promise<HotelSearchResponce | undefined> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", SearchParams.destination || "");
  queryParams.append("checkIn", SearchParams.checkIn || "");
  queryParams.append("checkOut", SearchParams.checkOut || "");
  queryParams.append("adultCount", SearchParams.adultCount || "");
  queryParams.append("childCount", SearchParams.childCount || "");
  queryParams.append("page", SearchParams.page || "");

  queryParams.append("maxPrice", SearchParams.maxPrice || "");
  queryParams.append("sortOptions", SearchParams.sortOptions || "");

  SearchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );

  SearchParams.types?.forEach((type) => queryParams.append("types", type));
  SearchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const res = await fetch(`${API_URL}/api/hotels/search?${queryParams}`);
  const data = await res.json();

  
  return data;
};

export default SearchHotels;
