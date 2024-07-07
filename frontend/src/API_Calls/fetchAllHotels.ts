import { Hoteltype } from "../../../backend/src/shared/types";
import { API_URL } from "../main";

export const fetchHotels = async (): Promise<Hoteltype[]> => {
  const response = await fetch(`${API_URL}/api/hotels`);
  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }
  return response.json();
};
