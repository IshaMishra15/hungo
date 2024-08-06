const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }, // Add role field
  restaurantName: { type: String }, // Add restaurantName field
  address: { type: String }, // Add address field
});

const User = mongoose.model("User", userSchema);

module.exports = User;
