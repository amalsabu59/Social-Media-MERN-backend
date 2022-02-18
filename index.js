const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")

dotenv.config()


mongoose.connect(process.env.MONGO_URI, {
   
    useNewUrlParser: true,
    useUnifiedTopology: true,

    
  }).then(()=> console.log("connected  to mongodb"))

    .catch(err => console.log(err));



//Middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);


app.listen(8800,()=>{
    console.log("backend server is running !!");
})
