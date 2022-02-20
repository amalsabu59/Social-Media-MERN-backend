const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")
const postRoutes = require("./routes/posts")

dotenv.config()


mongoose.connect(process.env.connection_url, {
   
    useNewUrlParser: true,
    useUnifiedTopology: true,
    

    
  }).then(()=> console.log("connected  to mongodb !!"))

    .catch(err => console.log(err.message));



//Middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/posts",postRoutes);


app.listen(8800,()=>{
    console.log("backend server is running !!");
})
