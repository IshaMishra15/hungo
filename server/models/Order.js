const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        name: String,
        servings: Number,
        // No need for restaurantName here
      },
    ],
    ngoName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pickupTime: {
      type: String,
      required: true,
    },
    restaurantName: {
      type: String, // Ensure this is included
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
