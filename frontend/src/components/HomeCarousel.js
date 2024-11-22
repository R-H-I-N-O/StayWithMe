import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'primereact/carousel';
import { useQuery } from 'react-query';
import * as apiClient from "../api-client";
import { useAppContext } from '../contexts/AppContext';

export default function HomeCarousel() {
    const { showToast } = useAppContext();

    // Fetch hotels using React Query
    const { data = [], isError } = useQuery(
        "fetchTrendingHotels",
        apiClient.fetchTrendingHotels,
        {
            onError: () => {
                showToast({
                    type: "ERROR",
                    message: "Error in fetching data, try again",
                });
            },
        }
    );

    const [hotels, setHotels] = useState([]);

    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1,
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1,
        },
    ];

    // Update hotels state when data changes
    useEffect(() => {
        setHotels(data);
    }, [data]);

    // Template for each hotel card
    const hotelTemplate = (hotel) => {
        return (
            <div className="hotel-card border-1 surface-border border-round m-2 p-3 text-left">
                {/* Hotel Image */}
                <div className="relative w-[1/3] h-[200px] overflow-hidden rounded-lg">
                    <img
                        src={hotel.imageUrls?.[0] || '/default-hotel.jpg'}
                        alt={hotel.name}
                        className="object-cover w-full h-full"
                    />
                </div>
                {/* Hotel Details */}
                <div className="mt-3">
                    <h4 className="text-lg font-bold text-gray-800 truncate overflow-hidden">{hotel.name}</h4>
                    <p className="text-sm text-gray-600 mb-1">
                        {hotel.city}, {hotel.country}
                    </p>
                    <p className="text-sm text-gray-700 line-clamp-2 overflow-hidden">
                        {hotel.description || "No description available."}
                    </p>
                </div>
                {/* View More Button */}
                <div className="mt-3 flex justify-end">
                    <Link to={`/details/${hotel._id}`} className='bg-blue-600 text-white h-full p-2 font-bold text-xl max-w-fit hover:bg-blue-500'>View More</Link>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            {/* Error or Loading State */}
            {isError ? (
                <p className="text-center text-red-500">Failed to load hotels.</p>
            ) : hotels.length === 0 ? (
                <p className="text-center text-gray-500">Loading hotels...</p>
            ) : (
                // Render Carousel
                <Carousel
                    value={hotels}
                    numScroll={1}
                    numVisible={3}
                    responsiveOptions={responsiveOptions}
                    itemTemplate={hotelTemplate}
                    autoplayInterval={4000}
                />
            )}
        </div>
    );
}
