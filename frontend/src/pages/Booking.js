import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useParams } from "react-router-dom";
import { useSearchContext } from "../contexts/SearchContext";
import { useEffect, useState } from "react";
import BookingDetailSummary from "../components/BookingDetailSummary";

const Booking = ()=>{

    const hotelId = useParams();
    const search = useSearchContext();
    const [numberOfNights, setNumberOfNights] = useState(0);

    useEffect(()=>{
        if(search.checkIn && search.checkOut){
            const nights = Math.abs(search.checkOut.getTime()-search.checkIn.getTime())/(1000*60*60*24);
            setNumberOfNights(Math.ceil(nights));
        }
    }, [search.checkIn, search.checkOut]);
    
    const {data: hotel} = useQuery("fetchHotelById", ()=> apiClient.fetchHotelbyIdForDetails(hotelId),{
        enabled: !!hotelId
    });

    const { data: currentUser, isLoading, isError, error } = useQuery(
        "fetchCurrentUser",
        apiClient.fetchCurrentUser
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }



    return(
        <div className="grid md:grid-cols-[1fr_2fr] space-x-20">
            <BookingDetailSummary checkIn={search.checkIn}
                checkOut={search.checkOut}
                adultCount ={search.adultCount}
                childCount={search.childCount}
                numberOfNights = {numberOfNights}
                hotel={hotel}
            />
            <BookingForm currentUser={currentUser}/>
        </div>
    );
}

export default Booking;