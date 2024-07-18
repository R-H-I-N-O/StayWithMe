import {useState} from 'react';
import {MdTravelExplore} from 'react-icons/md'
import {useSearchContext} from "../contexts/SearchContext"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { useNavigate } from 'react-router-dom';

const SearchBar = ()=>{
    const search = useSearchContext();
    const navigate = useNavigate();
    const [destination, setDestination] = useState(search.destination);
    const [checkIn, setCheckIn] = useState(search.checkIn);
    const [checkOut, setCheckOut] = useState(search.checkOut);
    const [adultCount, setAdultCount] = useState(search.adultCount);
    const [childCount, setChildCount] = useState(search.childCount);

    const handleSubmit = (event)=>{
        event.preventDefault();
        search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount);
        navigate("/search");
    }

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear()+1);

    return(
        <form className='-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4' onSubmit={(event)=>handleSubmit(event)}>
            
            <div className='flex flex-row flex-1 items-center bg-white p-2'>
                <MdTravelExplore className='mr-2'/>
                <input className='text-md width-full focus:outline-none' 
                value={destination} 
                onChange={(event)=>setDestination(event.target.value)} 
                placeholder='Where are you going?'/>
            </div>

            <div className='flex bg-white px-2 py-1 gap-2'>
                <label className='items-center flex'>
                    Adult: 
                    <input className='w-full p-1 focus:outline-none font-bold'
                    type='number'
                     min={1}
                     max={20}
                     value={adultCount}
                     onChange={(event)=> setAdultCount(parseInt(event.target.value.toString()))}
                    />
                </label>
                <label className='items-center flex'>
                    Child: 
                    <input className='w-full p-1 focus:outline-none font-bold'
                    type='number'
                     min={0}
                     max={20}
                     value={childCount}
                     onChange={(event)=> setChildCount(parseInt(event.target.value.toString()))}
                    />
                </label>
            </div>
            <div>
            <DatePicker
            selected={checkIn}
            onChange={(date)=> setCheckIn(date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText='Check-in date'
            className='min-w-full bg-white p-2 focus:outline-none'
            wrapperClassName='min-w-full'
            />
            </div>
            <div>
            <DatePicker
            selected={checkOut}
            onChange={(date)=> setCheckOut(date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText='Check-in date'
            className='min-w-full bg-white p-2 focus:outline-none'
            wrapperClassName='min-w-full'
            />
            </div>
            <div className='flex gap-1'>
                <button className='bg-blue-600 w-2/3 text-white h-full p-2 font-bold text-xl hover:bg-blue-500'>
                    Search
                </button>
                <button className='bg-red-600 w-1/3 text-white h-full p-2 font-bold text-xl hover:bg-red-500'>
                    Clear
                </button>
            </div>
        </form>
    );
}

export default SearchBar;