const API_URL = import.meta.env.VITE_API_BASE_URL;

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
