const express = require('express');
const app = express();

// Load config from .env file
require("dotenv").config();

// Enable CORS for all routes
const cors = require("cors");
// ✅ CORS setup for deployed frontend
app.use(cors({
  origin: [
    "https://fullstack-todo-app-11.onrender.com", // deployed frontend
    "http://localhost:3000" // local frontend
  ],
  credentials: true // cookies/session ke liye
}));
// Middleware to parse JSON request body
app.use(express.json());

// Import routes
const todoRoutes = require('./routes/Todos');
const cookieParser = require("cookie-parser");
app.use(cookieParser());
// Mount the todo API routes — Example: http://localhost:3000/api/v1/createT    odo
app.use("/api/v1", todoRoutes);
app.use("/api/auth", require("./routes/authRoutes"));

// Start the server
const PORT = process.env.PORT || 3000; // 👈 
app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
});


//connect to the databse

const dbConnect = require("./config/database")
dbConnect();

//deflaut route tumahre upper hai
app.get("/",(req,res)=>{
    res.send(`<h1>this is homepage body</h1>`)
})
