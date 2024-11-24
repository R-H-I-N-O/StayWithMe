const Hotels = require("../models/hotelSchema");
const User = require("../models/userSchema");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_API_KEY);

const handleFetchUserForBooking = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in fetching user details:", error);
    return res.status(500).json({ message: "Error in fetching user details" });
  }
};

const handlePaymentIntentCreation = async (req, res) => {
  try {
    const { numberOfNights } = req.body;
    const hotelId = req.params.hotelId;

    // Validate inputs
    if (!numberOfNights || !hotelId) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const hotel = await Hotels.findById(hotelId);

    if (!hotel) {
      return res.status(400).json({ message: "Hotel not found" });
    }

    const totalCost = hotel.pricePerNight * numberOfNights; // Amount in paise for INR

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost,
      currency: "inr",
      metadata: {
        hotelId,
        userId: req.userId,
      },
    });

    if (!paymentIntent.client_secret) {
      return res.status(400).json({ message: "Error in creating payment intent" });
    }

    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      totalCost,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error in creating payment intent:", error);
    return res.status(500).json({ message: "Error in creating payment intent" });
  }
};

const handleBookingPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    
    if (!paymentIntentId) {
      return res.status(400).json({ message: "Payment ID is required" });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (!paymentIntent) {
      return res.status(400).json({ message: "Payment intent not found" });
    }

    if (
      paymentIntent.metadata.hotelId !== req.params.hotelId ||
      paymentIntent.metadata.userId !== req.userId
    ) {
      return res.status(400).json({ message: "Payment intent mismatch" });
    }

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        message: `Payment intent not succeeded, status: ${paymentIntent.status}`,
      });
    }

    const newBooking = {
      ...req.body,
      userId: req.userId,
    };

    const hotel = await Hotels.findByIdAndUpdate(
      req.params.hotelId,
      {
        $push: { bookings: newBooking },
      },
      { new: true }
    );

    if (!hotel) {
      return res.status(400).json({ message: "Hotel not found" });
    }

    res.status(200).send();
  } catch (error) {
    console.error("Error in booking hotel:", error);
    return res.status(500).json({ message: "Error in booking hotel" });
  }
};

module.exports = {
  handleFetchUserForBooking,
  handlePaymentIntentCreation,
  handleBookingPayment,
};
