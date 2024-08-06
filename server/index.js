//packages
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
//utils
dotenv.config();
const connectDB = require("./config/db.js");

const port = process.env.PORT || 5000;
connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "10mb" })); // Increase limit as needed
app.use(express.urlencoded({ limit: "10mb", extended: true }));
const cron = require("node-cron");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/orders", orderRoutes);

app.listen(port, () => console.log(`Server running on port :${port}`));
