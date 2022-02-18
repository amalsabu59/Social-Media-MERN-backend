const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config()


mongoose.connect(process.env.MONGO_URI, {
   
    useNewUrlParser: true,
    useUnifiedTopology: true,

    
    
  }).then(()=> console.log("connected  to mongodb"))

    .catch(err => console.log(err));





app.listen(8800,()=>{
    console.log("backend server is running !!");
})