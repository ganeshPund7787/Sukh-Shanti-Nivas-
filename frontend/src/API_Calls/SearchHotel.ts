import { HotelSearchResponce } from "../../../backend/src/shared/types";
import { API_URL } from "../main";

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
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

  const res = await fetch(`${API_URL}/api/hotels/search?${queryParams}`);
  const data = await res.json();
  console.log(`Responce : => `, data);
  return data;
};

export default SearchHotels;
