import { useSearchContext } from "../contexts/SearchContext";
import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypeFilter from "../components/HotelTypeFilter";
import HotelFacilitiesFilter from "../components/HotelFacilitiesFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {

    const [page, setPage] = useState(1);
    const [selectedStars, setSelectedStars] = useState([]);
    const [selectedHotelTypes, setSelectedHotelTypes] = useState([]);
    const [selectedHotelFacilities, setSelectedHotelFacilities] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState();
    const [sortOption, setSortOption] = useState([]);
    const search = useSearchContext();

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn,
        checkOut: search.checkOut,
        adultCount: search.adultCount,
        childCount: search.childCount,
        page: page,
        stars: selectedStars,
        types: selectedHotelTypes,
        facilities: selectedHotelFacilities,
        maxPrice: selectedPrice?.toString(),
        sortOption: sortOption,
    }

    const { data: hotelsData } = useQuery(["searchHotels", searchParams], () => apiClient.searchHotels(searchParams));

    const handleStarChange = (event)=>{
        const starRating = event.target.value;

        setSelectedStars((prevStars)=>
        event.target.checked
        ? [...prevStars, starRating]
    : prevStars.filter((star)=> star !== starRating));
    }

    const handleHotelTypesChange = (event)=>{
        const hotelType = event.target.value;

        setSelectedHotelTypes((prevTypes)=>
        event.target.checked
        ? [...prevTypes, hotelType]
    : prevTypes.filter((type)=> type !== hotelType));
    }

    const handleHotelFacilitiesChange = (event)=>{
        const hotelFacility = event.target.value;

        setSelectedHotelFacilities((prevFacility)=>
        event.target.checked
        ? [...prevFacility, hotelFacility]
    : prevFacility.filter((facility)=> facility !== hotelFacility));
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                        Filter by:
                    </h3>
                    <StarRatingFilter selectedStars={selectedStars} onChange={handleStarChange}/>
                    <HotelTypeFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypesChange}/>
                    <HotelFacilitiesFilter selectedHotelFacilities={selectedHotelFacilities} onChange={handleHotelFacilitiesChange}/>
                    <PriceFilter selectedPrice={selectedPrice} onChange={(value)=> {setSelectedPrice(value)}}/>
                </div>
            </div>
            <div className="flex flex-col gap-5 px-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {hotelsData?.pagination.total} Hotels found
                        {search.destination ? ` in ${search.destination}` : ""}
                    </span>
                    <select value={sortOption}
                        onChange={(event)=> setSortOption(event.target.value)}
                        className="p-2 border rounded-md"
                    >
                        <option value="">Sort by</option>
                        <option value="starrating">Satr Rating</option>
                        <option value="pricePerNightAsc">Price Per Night (Low to High)</option>
                        <option value="pricePerNightDsc">Price Per Night (High to Low)</option>
                    </select>
                </div>
                {hotelsData?.data.map((hotel) => (
                    <SearchResultCard hotel={hotel} />
                ))}
                <div>
                    <Pagination page={hotelsData?.pagination.page}
                        pages={hotelsData?.pagination.pages}
                        onPageChange={(page) => setPage(page)}
                    />
                </div>
            </div>
        </div>
    );
}

export default Search;