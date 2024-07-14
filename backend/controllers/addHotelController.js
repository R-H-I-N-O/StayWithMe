const cloudinary = require('cloudinary');
const Hotels = require('../models/hotelSchema');

const handleAddHotel = async (req, res) => {
    try {
        const newHotel = req.body;
        const imageFiles = req.file;

        const uploadPromises = imageFiles.map(async (image)=>{
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI= "data:" + image.mimetype + ";base64," + b64;
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
        res.status(500).json({message: "Something went wrong"});
    }
}

module.exports = handleAddHotel;