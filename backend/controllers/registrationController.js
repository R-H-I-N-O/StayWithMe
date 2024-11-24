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
        return res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "error in creating user"});
    }
}

module.exports = {handleUserRegisteration};