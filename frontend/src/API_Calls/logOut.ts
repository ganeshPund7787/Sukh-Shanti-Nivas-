import toast from "react-hot-toast";

import { API_URL } from "../main";

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
