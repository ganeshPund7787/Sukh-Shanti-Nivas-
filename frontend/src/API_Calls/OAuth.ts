import toast from "react-hot-toast";
import { API_URL } from "../main";

const OAuth = async () => {
  try {
    const res = await fetch(`${API_URL}/api/auth/googleAuth`, {
      method: "POST",
    });
    console.log(res);
  } catch (error: any) {
    toast.error(error.message);
    console.log(`Erorr while OAuth : ${error.message}`);
  }
};

export default OAuth;
