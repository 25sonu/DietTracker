const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors");
const diets = require("./routes/dietRoutes");
const path = require('path')
require("dotenv").config( { path: "./config.env" } )
 const dietRoutes = require('./routes/dietRoutes');




// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/diets", diets)


    const PORT = process.env.PORT || 5000;
    console.log(`Server running at http://localhost:${PORT}`);
 
