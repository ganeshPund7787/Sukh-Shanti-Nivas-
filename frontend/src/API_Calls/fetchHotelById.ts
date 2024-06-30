import { API_URL } from "../main";
import { Hoteltype } from "../../../backend/src/shared/types";

export const fetchMyHotelById = async (hotelId: string): Promise<Hoteltype> => {
  try {
    const res = await fetch(`${API_URL}/api/my-hotels/${hotelId}`, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Error on view hotel detail");
    }

    return res.json();
  } catch (error: any) {
    console.log(`Error while get-Hotel-by-Id client : `, error);
    return error;
  }
};
