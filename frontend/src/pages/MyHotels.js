import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import * as apiClient from "../api-client";
import { useAppContext } from '../contexts/AppContext';
import { BsBuilding, BsMap } from 'react-icons/bs';
import { BiHotel, BiMoney, BiStar } from 'react-icons/bi';

const MyHotels = () => {
    const { showToast } = useAppContext();
    const { data } = useQuery("fetchMyHotel", apiClient.fetchMyHotels, {
        onError: () => {
            showToast({ type: "ERROR", message: "Error in fetching data, try again" });
        }
    });
    if (!data) {
        return <span>No hotels found!</span>
    }
    return (
        <div className="space-y-5">
            <span className='flex justify-between'>
                <h1 className="text-3xl font-bold" >My Hotels</h1>
                <Link to="/add-hotel" className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500" >Add Hotel</Link>
            </span>
            <div className='grid grid-cols-1 gap-8 pt-8'>
                {data.map((hotel) => (
                    <div className='flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5 '>
                        <h2 className='text-2xl font-bold'>{hotel.name}</h2>
                        <div className='whitespace-pre-line'>{hotel.description}</div>
                        <div className='grid grid-cols-5 gap-2'>
                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <BsMap className='mr-1' />
                                {hotel.city}, {hotel.country}
                            </div>
                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <BsBuilding className='mr-1' />
                                {hotel.type}
                            </div>
                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <BiMoney className='mr-1' />
                                {hotel.pricePerNight} per night
                            </div>
                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <BiHotel className='mr-1' />
                                {hotel.adultCount} Adults, {hotel.childCount} Children
                            </div>
                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <BiStar className='mr-1' />
                                {hotel.starRating} star rating
                            </div>
                        </div>
                        <span className='flex justify-end'>
                            <Link to={`/edit-hotel/${hotel._id}`} className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"> Edit Hotel</Link>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyHotels;