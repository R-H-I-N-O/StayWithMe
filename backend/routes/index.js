const express = require("express");
const {
  handleSearch,
  handleHotelViewPage,
} = require("../controllers/searchController");
const handleTrendingFetch = require("../controllers/handleTrendingFetch");
const { validateUser } = require("../middlewares/auth");
const { handleBookingPayment } = require("../controllers/bookingController");
const { param } = require("express-validator");
const handleMyBookingsController = require("../controllers/handleMyBookingsController");

const router = express.Router();

// Utility middleware for validating ObjectId
const validateObjectId = (paramName) => {
  return param(paramName).custom((value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error(`${paramName} must be a valid ObjectId`);
    }
    return true;
  });
};

router.use("/api/users", require("./users"));
router.get("/api/hotels/search", handleSearch);
router.get("/api/hotels/trending", handleTrendingFetch);
router.get("/api/hotels/search/:id", handleHotelViewPage);
// Handle hotel bookings
router.post(
  "/api/hotels/:hotelId/bookings",
  validateUser,
  validateObjectId("hotelId"),
  handleBookingPayment
);

//For fetching my bookings
router.get("/api/my-bookings",validateUser , handleMyBookingsController);

module.exports = router;
