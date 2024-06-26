import toast from "react-hot-toast";
import { SignInFormData } from "../pages/SignIn";
import { API_URL } from "../main";

export const SignInUser = async (formdata: SignInFormData) => {
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formdata),
    });

    const data = await res.json();

    console.log(data);

    if (!res.ok) {
      toast.error(data.message);
      return;
    }
    toast.success("User login successfully");
    return data;
  } catch (error: any) {
    toast.error(error.message);
    console.log(`Error while login in client : ${error}`);
  }
};
