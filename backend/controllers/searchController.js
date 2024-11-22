const Hotels = require("../models/hotelSchema");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const handleSearch = async (req, res) => {
  try {
    const query = constructSearchQuery(req.query);

    const pageNumber = parseInt(req.query.page) || 1;
    const pageSize = 5;

    if (pageNumber <= 0) {
      return res.status(400).json({ message: "Invalid page number" });
    }

    const skip = (pageNumber - 1) * pageSize;

    let sortOptions = {};
    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDsc":
        sortOptions = { pricePerNight: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 }; // Default sorting by creation date
    }

    const hotels = await Hotels.find(query).sort(sortOptions).skip(skip).limit(pageSize);

    const total = await Hotels.countDocuments(query);
    const response = {
      data: hotels,
      pagination: {
        page: pageNumber,
        total,
        pages: Math.ceil(total / pageSize),
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in fetching hotels:", error);
    return res.status(500).json({ message: "Error in fetching hotels" });
  }
};

const handleHotelViewPage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const hotelId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json({ message: "Invalid hotel ID" });
    }

    const hotel = await Hotels.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    return res.status(200).json(hotel);
  } catch (error) {
    console.error("Error in fetching hotel data:", error);
    return res.status(500).json({ message: "Error in fetching hotel data" });
  }
};

const constructSearchQuery = (queryParams) => {
  const constructedQuery = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = { $gte: parseInt(queryParams.adultCount) || 0 };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = { $gte: parseInt(queryParams.childCount) || 0 };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types) ? queryParams.types : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star) => parseInt(star))
      : [parseInt(queryParams.stars)];
    constructedQuery.starRating = { $in: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = { $lte: parseInt(queryParams.maxPrice) };
  }

  return constructedQuery;
};

module.exports = { handleSearch, handleHotelViewPage };
