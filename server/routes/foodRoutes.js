// const express = require("express");
// const multer = require("multer");
// const Food = require("../models/Food");
// const router = express.Router();

// // Configure multer for file uploads
// const storage = multer.memoryStorage(); // Use memory storage for simplicity
// const upload = multer({ storage });

// // POST /api/food
// router.post("/", upload.single("photo"), async (req, res) => {
//   const { name, description, servings, type } = req.body;
//   const photo = req.file; // Multer will handle the file

//   const newFood = new Food({
//     name,
//     description,
//     servings,
//     type,
//     photo: photo ? photo.buffer.toString("base64") : "", // Encode photo as base64
//   });

//   try {
//     const savedFood = await newFood.save();
//     res.status(201).json(savedFood);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });
// // Get all food items
// router.get("/", async (req, res) => {
//   try {
//     const foods = await Food.find();
//     res.status(200).json(foods);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch food items" });
//   }
// });

// module.exports = router;

const express = require("express");
const multer = require("multer");
const Food = require("../models/Food");
const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Use memory storage for simplicity
const upload = multer({ storage });

// POST /api/food
router.post("/", upload.single("photo"), async (req, res) => {
  const { name, description, servings, type, restaurantName } = req.body;
  const photo = req.file; // Multer will handle the file

  const newFood = new Food({
    name,
    description,
    servings,
    type,
    restaurantName,
    photo: photo ? photo.buffer.toString("base64") : "", // Encode photo as base64
  });

  try {
    const savedFood = await newFood.save();
    res.status(201).json(savedFood);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all food items
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch food items" });
  }
});

module.exports = router;
