const Hotels = require("../models/hotelSchema");
const {validationResult} = require('express-validator');

const handleSearch = async (req, res) => {
    try {
        const query = constructSearchQuery(req.query);
        const pageNumber = (req.query.page ? req.query.page.toString() : "1");
        const pageSize = 5;
        const skip = (pageNumber - 1) * pageSize;

        let sortOptions = {};

        switch(req.query.sortOption){
            case "starRating": {
                sortOptions = {starRating : -1};
                break;
            }
            case "pricePerNightAsc": {
                sortOptions = {pricePerNight : 1};
                break;
            }
            case "pricePerNightDsc": {
                sortOptions = {pricePerNight : -1};
                break;
            }
        }

        const hotels = await Hotels.find(query).sort(sortOptions).skip(skip).limit(pageSize);

        const total = await Hotels.countDocuments(query);
        const response = {
            data: hotels,
            pagination: {
                page: pageNumber,
                total,
                pages: Math.ceil(total / pageSize)
            }
        };

        return res.status(200).json(response);

    } catch (error) {
        console.error("error in fetching hotels", error);
        return res.status(500).json({ message: "Error in fetching hotels" });
    }
}

const handleHotelViewPage = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    try {
        const id = req.params.id;

        const hotel = await Hotels.findById(id);

        return res.status(200).json(hotel);
    } catch (error) {
        console.error("Error in fetching hotel data", error)
        return res.status(500).json({ message: "Error in fetching hotel data" });
    }
}

const constructSearchQuery = (queryParams) => {
    const constructedQuery = {};

    if (queryParams.destination) {
        constructedQuery.$or = [
            { city: new RegExp(queryParams.destination, "i") },
            { country: new RegExp(queryParams.destination, "i") }
        ];
    }

    if (queryParams.adultCount) {
        constructedQuery.adultCount = {
            $gte: queryParams.adultCount
        }
    }

    if (queryParams.childCount) {
        constructedQuery.childCount = {
            $gte: queryParams.childCount
        }
    }

    if(queryParams.facilities){
        constructedQuery.facilities = {
            $all : Array.isArray(queryParams.facilities)
            ? queryParams.facilities 
            : [queryParams.facilities]
        }
    }

    if(queryParams.types){
        constructedQuery.type = {
            $in : Array.isArray(queryParams.types)
            ? queryParams.types 
            : [queryParams.types]
        }
    }

    if(queryParams.stars){
        const starRatings = Array.isArray(queryParams.stars)
        ? queryParams.stars.map((star)=> parseInt(star))
        : parseInt(queryParams.stars);
        constructedQuery.starRating = { $in : starRatings }
    }

    if(queryParams.maxPrice){
        constructedQuery.pricePerNight = {
            $lte: parseInt(queryParams.maxPrice).toString()
        }
    }

    return constructedQuery;
}

module.exports = { handleSearch, handleHotelViewPage };