import { BookingFormData } from "../forms/BookingForm/BookingForm";
import { API_URL } from "../main";

export const createRoomBooking = async (formData: BookingFormData) => {
  const response = await fetch(
    `${API_URL}/api/hotels/${formData.hotelId}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    throw new Error("Error booking room");
  }
};
