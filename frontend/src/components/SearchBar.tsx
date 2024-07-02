import { FormEvent, useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineClear } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-5 p-2 bg-orange-500 rounded shadow-md flex flex-wrap justify-evenly items-center gap-3"
    >
      <div className="flex flex-row p-2 flex-1 bg-white items-center">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going ?"
          className="text-sm w-full focus:outline-none"
          type="text"
          onChange={(e) => setDestination(e.target.value)}
          value={destination}
        />
      </div>

      <div className="flex bg-white w-52 px-2 py-1 gap-2">
        <label className="items-center flex">
          Adults:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="items-center flex">
          Children:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>

      <div className="">
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="check-in Date"
          className="bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>

      <div className="">
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="check-in Date"
          className="rounded bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>

      <div className="flex items-center gap-1">
        <button
          type="submit"
          className="bg-purple-600 text-white h-full p-2 px-2 font-bold text-xl hover:bg-purple-400"
        >
          Search
        </button>
        <button
          type="submit"
          title="clear"
          className="w-1/4 flex justify-center rounded-full px-1 hover:animate-bounce text-white h-full p-2 font-bold text-2xl"
        >
          <AiOutlineClear />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
