const Hotels = require("../models/hotelSchema");
const User = require("../models/userSchema");
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_API_KEY);

const handleFetchUserForBooking = async (req, res)=>{
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error in fetching details", error);
        return res.status(500).json({ message: "Error in fetching details" });
    }
}

const handlePaymentIntentCreation = async (req, res)=>{

    try {
        const {numberOfNights} = req.body;
        const hotelId = req.params.hotelId;

        const hotel = await Hotels.findById(hotelId);

        if(!hotel){
            res.status(400).json({message: "Hotel not found"});
        }

        const totalCost = hotel.pricePerNight * numberOfNights;

        const paymentIntent = await stripe.paymentIntents.create({
            amount : totalCost,
            currency: "inr",
            metadata: {
                hotelId,
                userId: req.userId
            }
        });

        if(!paymentIntent.client_secret){
            res.status(400).json({message: "Erroe in creating payment intent"});
        }

        const response = {
            paymentIntentId: paymentIntent.id,
            clientSecret: paymentIntent.client_secret,
            totalCost
        }

        res.status(200).json(response);
    } catch (error) {
        console.error("error in creating payment-intent", error);
        return res.status(500).json({message: "error in creating payment-intent"});
    }
}

const handleBookingPayment = async (req,res)=>{
try {
    const paymentId = req.body.paymentId;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

    if(!paymentIntent){
        res.status(400).json({message: "payment intent not found"});
    }

    if(paymentIntent.metadata.hotelId !== req.params.hotelId || paymentIntent.metadata.userId !== req.userId){
        res.status(400).json({message: "payment intent mismatch"});
    }

    if(paymentIntent.status !== "succeeded"){
        res.status(400).json({message: `payment intent not succeeded, status: ${paymentIntent.status}`});
    }

    const newBooking = {
        ...req.body,
        userId: req.userId
    };

    const hotel = await Hotels.findOneAndUpdate({id: req.params.hotelId},{
        $push: {bookings: newBooking}
    });

    if(!hotel){
        res.status(400).json({message: "Hotel not found"});
    }

    await hotel.save();

    res.status(200).send();
} catch (error) {
    console.error("error in creating booking hotel", error);
    return res.status(500).json({message: "error in creating booking hotel"});
}
}

module.exports = {handleFetchUserForBooking, handlePaymentIntentCreation, handleBookingPayment};