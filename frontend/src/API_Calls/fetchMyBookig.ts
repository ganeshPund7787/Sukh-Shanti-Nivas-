import { Hoteltype } from "../../../backend/src/shared/types";
import { API_URL } from "../main";

export const fetchMyBookings = async (): Promise<Hoteltype[]> => {
  const response = await fetch(`${API_URL}/api/my-bookings`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch bookings");
  }

  return response.json();
};
