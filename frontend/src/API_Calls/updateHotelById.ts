import toast from "react-hot-toast";
import { API_URL } from "../main";

const updateHotelById = async (hotelFormData: FormData) => {
  try {
    const res = await fetch(
      `${API_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
      {
        method: "PUT",
        body: hotelFormData,
        credentials: "include",
      }
    );

    if (!res.ok) {
      toast.error("Fail to update hotel");
      throw new Error("Fail to update hotel");
    }
    toast.success("Hotel update successfully");
    return res.json();
  } catch (error) {
    console.log(`error while updateHotel client: `, error);
  }
};

export default updateHotelById;
