const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(()=>{
    console.log("Db connected successfully");
}).catch((err)=>{
    console.error(err);
});