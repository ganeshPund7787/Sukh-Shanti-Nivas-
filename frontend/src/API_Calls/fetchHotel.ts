import { Hoteltype } from "../../../backend/src/shared/types";
import { API_URL } from "../main";

export const fetchHotelById = async (hotelId: string): Promise<Hoteltype> => {
  const response = await fetch(`${API_URL}/api/hotels/${hotelId}`);
  if (!response.ok) {
    throw new Error("Error fetching Hotels");
  }

  return response.json();
};
