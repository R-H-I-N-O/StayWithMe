const User = require("../models/userSchema");
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const handleUserRegisteration = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message: errors.array()});
        }
        
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exist" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password  doesn't match" });
        }
        const hashedPassword = await bcrypt.hash(password, 8);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 10 * 60 * 60 * 10
        });
        return res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "error in creating user"});
    }
}

module.exports = {handleUserRegisteration};