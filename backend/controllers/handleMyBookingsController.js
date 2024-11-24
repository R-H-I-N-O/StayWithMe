const Hotels = require("../models/hotelSchema");

const handleMyBookingsController = async (req, res) => {
    try {
        // Find hotels where bookings include the user's ID
        const hotels = await Hotels.find({
            bookings: { $elemMatch: { userId: req.userId } },
        });

        // Filter and map the results to include only the user's bookings
        const results = hotels.map((hotel) => {
            const userBookings = hotel.bookings.filter(
                (booking) => booking.userId === req.userId
            );

            return {
                ...hotel.toObject(),
                bookings: userBookings, // Include only user's bookings
            };
        });

        // Send the results back to the client
        res.status(200).send(results);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Unable to fetch bookings" });
    }
};

module.exports = handleMyBookingsController;
