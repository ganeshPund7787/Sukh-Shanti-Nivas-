import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const logoutUser = async () => {
  const res = await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  const data = await res.json();
  console.log("data", data);
  if (!res.ok) {
    throw new Error(data.message);
  }
  toast.success(data.message);
  return data.message;
};
