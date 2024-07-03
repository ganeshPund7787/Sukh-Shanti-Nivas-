import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchMyHotelById } from "../API_Calls/fetchHotelById";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import updateHotelById from "../API_Calls/updateHotelById";

const UpdateHotel = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );
  const { mutate, isLoading } = useMutation(updateHotelById, {
    onSuccess: () => {},
    onError: () => {},
  });
  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return hotel ? (
    <ManageHotelForm onSave={handleSave} hotel={hotel} isLoading={isLoading} />
  ) : (
    <div>Loading....</div>
  );
};

export default UpdateHotel;
