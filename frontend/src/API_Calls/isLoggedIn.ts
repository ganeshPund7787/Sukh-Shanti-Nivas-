import { API_URL } from "../main";


export const validateToken = async () => {
  const res = await fetch(`${API_URL}/api/auth/validate-token`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Token validation failed");
  }

  return data;
};
