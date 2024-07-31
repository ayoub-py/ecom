const express = require("express"),
    app = express(),
    connectDB = require("./config/database"),
    morgan = require('morgan'),
    bodyParser = require("body-parser");
require("dotenv").config();

//env vars
const api = process.env.API_URL;

//middlewares
app.use(bodyParser.json());
app.use(morgan('tiny'))

connectDB();

app.post(`${api}/products`, (req, res) => {
    const newP = req.body;
    return res.json(newP);
})
app.listen(process.env.PORT, () => console.log("server is running on the port 80"));