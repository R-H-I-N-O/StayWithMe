const Hotels = require("../models/hotelSchema");

const handleTrendingFetch = async (req, res) => {
  try {
    const trendingHotels = await Hotels.find().sort({ createdAt: -1 }).limit(12);
    return res.status(200).json(trendingHotels);
  } catch (error) {
    console.error("error in fetching hotels", error);
    return res.status(500).json({ message: "Error in fetching hotels" });
  }
};

module.exports = handleTrendingFetch;
