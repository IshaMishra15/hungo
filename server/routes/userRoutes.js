const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { tokenBlacklist } = require("../middleware/tokenBlacklist");
const authenticateToken = require("../middleware/authenticateToken");
// Signup route
router.post("/signup", async (req, res) => {
  const { email, password, role, restaurantName, address } = req.body; // Accept additional fields for restaurant users
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      role,
      restaurantName: role === "restaurant" ? restaurantName : undefined,
      address: role === "restaurant" ? address : undefined,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role }, // Include role in the token payload
      "9c72cba9e8bcb5b3fc08cf64a5d2de8d7d3e6b7385e6e1a7",
      { expiresIn: "1h" }
    );

    res.json({ token, userId: user._id, role: user.role }); // Include role in the response
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", tokenBlacklist, (req, res) => {
  // The token will be blacklisted by the middleware
  res.status(200).json({ message: "Logout successful" });
});

router.get("/auth/currentUser", authenticateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
