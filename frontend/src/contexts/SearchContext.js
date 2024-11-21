import {createContext, useContext, useState} from 'react'

const SearchContext = createContext();

const SearchContextProvider = ({children})=>{
    const [destination, setDestination] = useState(()=> sessionStorage.getItem("destination") || "");
    const [checkIn, setCheckIn] = useState(()=> new Date(sessionStorage.getItem("checkIn")) || new Date.now().toISOString());
    const [checkOut, setCheckOut] = useState(()=> new Date(sessionStorage.getItem("checkOut")) || new Date().toISOString());
    const [adultCount, setAdultCount] = useState(()=> sessionStorage.getItem("adultCount") || 1);
    const [childCount, setChildCount] = useState(()=> sessionStorage.getItem("childCount") || 0);
    const [hotelId, setHotelId] = useState(()=> sessionStorage.getItem("hotelId") || "");

    const saveSearchValues = (destination, checkIn, checkOut, adultCount, childCount)=>{
        setDestination(destination);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setAdultCount(adultCount);
        setChildCount(childCount);
        if(hotelId){
            setHotelId(hotelId);
        }

        sessionStorage.setItem("destination", destination);
        sessionStorage.setItem("checkIn", checkIn);
        sessionStorage.setItem("checkOut", checkOut);
        sessionStorage.setItem("adultCount", adultCount);
        sessionStorage.setItem("childCount", childCount);
        if(hotelId){
            sessionStorage.setItem("hotelId", hotelId);
        }
    }

    return(
        <SearchContext.Provider value={{destination, checkIn, checkOut, adultCount, childCount, hotelId, saveSearchValues} }>
            {children}
        </SearchContext.Provider>
    );
}

export const useSearchContext = ()=>{
    const context = useContext(SearchContext);
    return context;
}

export default SearchContextProvider;