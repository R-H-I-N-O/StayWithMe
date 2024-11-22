const express = require("express");
const { check, body, param } = require("express-validator");
const { handleUserRegisteration } = require("../controllers/registrationController");
const { handleUserLogin } = require("../controllers/loginController");
const { validateUser } = require("../middlewares/auth");
const multerUpload = require("../config/multer");
const {
  handleAddHotel,
  handleGetHotelById,
  handleEditHotel,
  handleGetMyHotels,
} = require("../controllers/manageHotelController");
const {
  handleFetchUserForBooking,
  handlePaymentIntentCreation,
} = require("../controllers/bookingController");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");

const router = express.Router();

// Rate limiter for login and registration
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per window
  message: { message: "Too many requests, please try again later." },
});

// Utility middleware for validating ObjectId
const validateObjectId = (paramName) => {
  return param(paramName).custom((value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error(`${paramName} must be a valid ObjectId`);
    }
    return true;
  });
};

// Registration route
router.post(
  "/register",
  authRateLimiter,
  [
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
  ],
  handleUserRegisteration
);

// Login route
router.post(
  "/login",
  authRateLimiter,
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").notEmpty(),
  ],
  handleUserLogin
);

// Validate session
router.get("/validate", validateUser, (req, res) => {
  return res.status(200).json({ userId: req.userId });
});

// Logout route
router.post("/logout", (req, res) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true, // Ensure this is true in production
  });
  res.status(200).send({ message: "Logged out successfully" });
});

// Add hotel route
router.post(
  "/add-hotel",
  validateUser,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required and must be an array"),
  ],
  multerUpload.array("imageFiles", 6), // Limit upload to 6 files
  handleAddHotel
);

// Fetch user's hotels
router.get("/my-hotels", validateUser, handleGetMyHotels);

// Fetch hotel by ID
router.get("/my-hotels/:id", validateUser, validateObjectId("id"), handleGetHotelById);

// Edit hotel
router.put(
  "/my-hotels/:id",
  validateUser,
  validateObjectId("id"),
  multerUpload.array("imageFiles"), // File upload for editing hotel
  handleEditHotel
);

// Fetch user details for bookings
router.get("/me", validateUser, handleFetchUserForBooking);

// Payment Intent creation
router.post(
  "/:hotelId/bookings/payment-intent",
  validateUser,
  validateObjectId("hotelId"),
  handlePaymentIntentCreation
);

// Catch-all for invalid routes
router.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = router;
