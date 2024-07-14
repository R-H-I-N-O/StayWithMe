const express = require('express');
const {check, body} = require('express-validator')
const {handleUserRegisteration} = require("../controllers/registrationController"); 
const { handleUserLogin } = require('../controllers/loginController');
const {validateUser} = require("../middlewares/auth");
const multerUpload = require('../config/multer');
const handleAddHotel = require('../controllers/addHotelController');

const router = express.Router();

router.post("/register",[
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({ min:6}),
], handleUserRegisteration );

router.post("/login",[
    check("email", "Email is required").isEmail(),
    check("password", "Password is required"),
], handleUserLogin );

router.get("/validate", validateUser, (req,res)=>{
    return res.status(200).json({userId: req.userId});
});

router.post("/logout", (req,res)=>{
    res.cookie("auth_token","",{
        expires: new Date(0)
    });
    res.status(200).send();
});

router.post("/add-hotel", validateUser, [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("city is required"),
    body("country").notEmpty().withMessage("country is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("type").notEmpty().withMessage("type is required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required and must be a number"),
    body("facilities").notEmpty().isArray().withMessage("facilities is required")
], multerUpload.array("imageFiles", 6), handleAddHotel);

module.exports = router;