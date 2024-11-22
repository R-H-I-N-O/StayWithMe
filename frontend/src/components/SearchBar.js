import { useState } from "react";
import { MdTravelExplore } from "react-icons/md";
import { useSearchContext } from "../contexts/SearchContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { LuCalendar } from "react-icons/lu";
import { LuCalendarCheck } from "react-icons/lu";

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(search.destination);
  const [checkIn, setCheckIn] = useState(search.checkIn);
  const [checkOut, setCheckOut] = useState(search.checkOut);
  const [adultCount, setAdultCount] = useState(search.adultCount);
  const [childCount, setChildCount] = useState(search.childCount);

  const handleSubmit = (event) => {
    event.preventDefault();
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
      className="-mt-8 p-3 bg-white rounded-xl shadow-md flex flex-col md:flex-row items-center gap-2"
      onSubmit={(event) => handleSubmit(event)}
    >
      <div className="flex flex-row flex-1 items-center bg-white p-2 w-full md:w-[300px] rounded-xl border">
        <MdTravelExplore className="mr-2" />
        <input
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
          placeholder="Where are you going?"
        />
      </div>

      <div className="flex bg-white px-2 py-1 gap-2 w-full justify-between md:w-[180px] rounded-xl border">
        <label className="items-center flex">
          Adult:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) =>
              setAdultCount(parseInt(event.target.value.toString()))
            }
          />
        </label>
        <label className="items-center flex">
          Child:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) =>
              setChildCount(parseInt(event.target.value.toString()))
            }
          />
        </label>
      </div>
      <div className="flex gap-2 items-center rounded-xl border px-3 w-full justify-between md:w-[350px]">
        <div>
          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-in date"
            className="w-full md:w-[80px] bg-white p-2 focus:outline-none"
            wrapperClassName="min-w-full"
          />
        </div>
        <LuCalendar className="text-black"/>
        <div>
          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-in date"
            className="w-full md:w-[120px] bg-white p-2 focus:outline-none"
            wrapperClassName="min-w-full"
          />
        </div>
        <LuCalendarCheck className="text-black" />
      </div>
      <div className="flex gap-1 w-full md:w-[250px]">
        <button className="bg-blue-600 w-full text-white h-full p-2 font-bold text-xl hover:bg-blue-500 rounded-xl w-full md:w-[250px] md:ml-8">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
