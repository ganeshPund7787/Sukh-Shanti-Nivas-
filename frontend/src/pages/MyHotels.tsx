import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import fetchMyHotel from "../API_Calls/fetchMyHotel";
import { FaHotel } from "react-icons/fa6";
import { BsBuilding } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { data: hotelData } = useQuery("fetchMyHotels", fetchMyHotel, {
    onSuccess: () => {},
    onError: () => {},
  });

  if (!hotelData) {
    return <span>No Hotels found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to={"/add-hotel"}
          className="flex bg-purple-600 mx-5 text-white rounded text-sm font-bold p-2 hover:bg-purple-400"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="flex flex-wrap gap-3">
              <div className="border border-slate-300 rounded-sm p-2 flex items-center">
                <FaHotel className="mr-1" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-2 flex items-center">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-2 flex items-center">
                <BiMoney className="mr-1" />${hotel.pricePerNight} Per night
              </div>
              <div className="border border-slate-300 rounded-sm p-2 flex items-center">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-sm p-2 flex items-center">
                <BiStar className="mr-1" />
                {hotel.starRating}
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                className="flex bg-purple-600 text-white text-sm font-bold p-2 animate-pulse hover:bg-purple-400"
                to={`/edit-hotel/${hotel._id}`}
              >
                update
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
