const express = require("express"),
  app = express(),
  connectDB = require("./config/database"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  productRoutes = require("./routes/productRoutes"),
  categoryRoutes = require("./routes/categoryRoutes"),
  userRoutes = require("./routes/userRoutes"),
  authMiddleware = require("./middlewares/authMiddleware"),
  fs = require("fs"),
  path = require("path");
require("dotenv").config();

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" },
);

// Setup the logger
app.use(morgan("combined", { stream: accessLogStream }));
//env vars
const api = process.env.API_URL;

//middlewares
app.use(bodyParser.json());
// app.use(morgan('tiny'))

//db connection
connectDB();

//routes
app.use((err,req,res,next)=>{
  if(err){
    res.status(500).json({message: "server error",error: err.message})
  }
})
app.use("/api/products", authMiddleware,productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);

//start server
app.listen(process.env.PORT || 80, () =>
  console.log("server is running on the port 80"),
);
