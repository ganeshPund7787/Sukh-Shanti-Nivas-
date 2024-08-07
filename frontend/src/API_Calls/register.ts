import toast from "react-hot-toast";
import { RegisterFormData } from "../pages/Register";
import { API_URL } from "../main";

export const registerUser = async (formData: RegisterFormData) => {
  try {
    const res = await fetch(`${API_URL}/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (!data.success) {
      const errorMessage =
        data.message[0]?.msg || data.message || "Registration failed";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
    return data;
  } catch (error: any) {
    toast.error(error.message);
    console.log(`Error while registering in client: ${error.message}`);
    throw error;
  }
};
