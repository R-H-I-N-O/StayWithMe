const cloudinary = require('cloudinary');
const Hotels = require('../models/hotelSchema');
const User = require('../models/userSchema');

const handleAddHotel = async (req, res) => {
    try {
        const newHotel = req.body;
        const imageFiles = req.files;

        const uploadPromises = imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        });
        const imageUrls = await Promise.all(uploadPromises);

        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

        const hotel = new Hotels(newHotel);
        await hotel.save();

        res.status(201).send(hotel);

    } catch (error) {
        console.error("error in adding hotel", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

const handleGetMyHotels = async (req, res) => {
    try {
        const hotels = await Hotels.find({ userId: req.userId });
        return res.status(200).json(hotels);
    } catch (error) {
        console.error("Error in fetching hotels", error);
        return res.status(500).json({ message: "Error in fetching hotels" });
    }

}

const handleGetHotelById = async (req, res) => {
    try {
        const hotelId = req.params.id.toString();

        const hotel = await Hotels.findOne({
            _id: hotelId,
            userId: req.userId
        });

        return res.status(200).json(hotel);
    } catch (error) {
        console.error("Error in fetching hotel details", error);
        return res.status(500).json({ message: "Error in fetching hotel details" });
    }
}

const handleEditHotel = async (req, res) => {

    try {
        const hotelId = req.params.id;
        const updatedHotel = req.body;

        const hotel = await Hotels.findOneAndUpdate({
            _id: hotelId,
            userId: req.userId
        }, updatedHotel, { new: true });

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        const files = req.files;

        const uploadPromises = files.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        });
        const updatedImageUrls = await Promise.all(uploadPromises);

        hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];

        await hotel.save();

        return res.status(201).json(hotel);
    } catch (error) {
        console.error("Error in editing hotel details", error);
        return res.status(500).json({ message: "Error in editing hotel details" });
    }

}

module.exports = { handleAddHotel, handleEditHotel, handleGetHotelById, handleGetMyHotels };