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
    console.log(data);
    if (!data.success) {
      throw new Error(data.message);
    }
  } catch (error: any) {
    console.log(`${error.message}`);
  }
};
