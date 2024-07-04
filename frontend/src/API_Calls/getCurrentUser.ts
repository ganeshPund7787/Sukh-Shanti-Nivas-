import { UserType } from "../../../backend/src/shared/types";
import { API_URL } from "../main";

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_URL}/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};
