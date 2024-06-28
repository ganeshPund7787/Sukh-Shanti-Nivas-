import toast from "react-hot-toast";
import { API_URL } from "../main";

export const AddMyHotel = async (hotelFormData: FormData) => {
  try {
    const res = await fetch(`${API_URL}/api/my-hotels`, {
      method: "POST",
      credentials: "include",
      body: hotelFormData,
    });

    if (!res.ok) {
      throw new Error("Faild to add hotel");
    }

    return res.json();
  } catch (error: any) {
    toast.error(error.message);
    console.log(`Error add-hotel client : ${error}`);
  }
};
