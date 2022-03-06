const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")
const postRoutes = require("./routes/posts")
const multer = require("multer")
const path = require("path")

dotenv.config()


mongoose.connect(process.env.connection_url, {
   
    useNewUrlParser: true,
    useUnifiedTopology: true,
    

    
  }).then(()=> console.log("connected  to mongodb !!"))

    .catch(err => console.log(err.message));


app.use("/images",express.static(path.join(__dirname,"public/images")));

app.use("/images/person",express.static(path.join(__dirname,"public/images/person")))
//Middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   try {
//     return res.status(200).json("File uploded successfully");
//   } catch (error) {
//     console.error(error);
//   }
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/person");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/uploaddp", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/posts",postRoutes);


app.listen(8800,()=>{
    console.log("backend server is running !!");
})
