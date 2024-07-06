import { PaymentIntentResponse } from "../../../backend/src/shared/types";
import { API_URL } from "../main";

const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> => {
  console.log("Working on create payamentIntent");
  const response = await fetch(
    `${API_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ numberOfNights }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching payment intent");
  }
  const data = await response.json();
  return data;
};

export default createPaymentIntent;
