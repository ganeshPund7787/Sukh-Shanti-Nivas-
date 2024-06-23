import toast from "react-hot-toast";
import { RegisterFormData } from "../pages/Register";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async (formData: RegisterFormData) => {
  try {
    const res = await fetch(`${API_URL}/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      const errorMessage =
        data.message[0]?.msg || data.message || "Registration failed";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    if (!data.success) {
      const errorMessage =
        data.message[0]?.msg || data.message || "Registration failed";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    toast.success(`data.message : ${data.message}`);
    return data;
  } catch (error: any) {
    toast.error(error.message);
    console.log(`Error while registering in client: ${error.message}`);
    throw error;
  }
};