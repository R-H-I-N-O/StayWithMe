const express = require('express');
require('dotenv').config();
const db = require("./config/mongoose");
const router = require("./routes/index")
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use("/", router);

app.listen(process.env.PORT, (err)=>{
    if(err){
        console.error(err);
    }
    console.log("Server running on localhost: " + process.env.PORT );
});