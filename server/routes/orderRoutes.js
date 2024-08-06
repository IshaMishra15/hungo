/*// server/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Food = require("../models/Food");
// Create a new order
router.post("/", async (req, res) => {
  const { items, ngoName, address, pickupTime, restaurantName } = req.body;

  const newOrder = new Order({
    items,
    ngoName,
    address,
    pickupTime,
    restaurantName, // Include restaurantName
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
});
router.get("/history", async (req, res) => {
  const { restaurantName } = req.query;

  if (!restaurantName) {
    return res.status(400).json({ message: "Restaurant name is required" });
  }

  try {
    const orders = await Order.find({ restaurantName });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Food.findByIdAndDelete(id);
      if (!result) return res.status(404).json({ message: "Item not found" });
      res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
module.exports = router;
*/

// server/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Food = require("../models/Food");

// Create a new order
router.post("/", async (req, res) => {
  const { items, ngoName, address, pickupTime, restaurantName } = req.body;

  try {
    // Create and save the new order
    const newOrder = new Order({
      items,
      ngoName,
      address,
      pickupTime,
      restaurantName,
    });
    const savedOrder = await newOrder.save();

    // Remove the ordered items from the Food collection
    await Promise.all(
      items.map(async (item) => {
        await Food.findByIdAndDelete(item._id);
      })
    );

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
});

// Fetch orders history by restaurant name
router.get("/history", async (req, res) => {
  const { restaurantName } = req.query;

  if (!restaurantName) {
    return res.status(400).json({ message: "Restaurant name is required" });
  }

  try {
    const orders = await Order.find({ restaurantName });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a food item
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Food.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
