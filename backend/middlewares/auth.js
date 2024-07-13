const jwt = require("jsonwebtoken");

const validateUser = (req,res,next)=>{
    const token = req.cookies["auth_token"];
    if(!token){
        return res.status(401).json({message: "Unautorized"});
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = payload.userId;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({message: "Unautorized"});
    }
}

module.exports = {validateUser};