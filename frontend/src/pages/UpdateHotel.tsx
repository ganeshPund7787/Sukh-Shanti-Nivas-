import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchMyHotelById } from "../API_Calls/fetchHotelById";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

const UpdateHotel = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  return hotel ? <ManageHotelForm hotel={hotel || ""} /> : <div></div>;
};

export default UpdateHotel;
