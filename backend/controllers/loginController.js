const { validationResult } = require('express-validator');
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const handleUserLogin = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json({ message: errors.array() });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 10 * 60 * 60 * 10
        });
        return res.status(200).json({ userId: user._id });
    } catch (error) {
        if(error){
            console.error(error);
            return res.status(500).json({ message: "Something went wrong" });
        }
    }
}

module.exports = {handleUserLogin};