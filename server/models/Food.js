// // models/Food.js
// const mongoose = require("mongoose");

// const foodSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   servings: {
//     type: Number,
//     required: true,
//   },
//   type: {
//     type: String,
//     enum: ["Veg", "Non-Veg"],
//     required: true,
//   },
//   photo: {
//     type: String,
//     required: true,
//   },
// });

// const Food = mongoose.model("Food", foodSchema);

// module.exports = Food;

const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["Veg", "Non-Veg"],
    required: true,
  },
  restaurantName: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
