import { API_URL } from "../main";
import { Hoteltype } from "../../../backend/src/shared/types";

const fetchMyHotel = async (): Promise<Hoteltype[]> => {
  try {
    const res = await fetch(`${API_URL}/api/my-hotels`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("faild to fetch hotels");
    }
    return res.json();
  } catch (error: any) {
    console.log(`Error while fetchMyHotel : ${error.message}`);
    return [];
  }
};

export default fetchMyHotel;
