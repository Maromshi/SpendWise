const express = require("express");
const router = express.Router();
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authenticationMiddleware");

// Register - creater new user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // bcrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      token: generateToken(newUser._id),
    });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id);
    res.json({
      message: "Login successful",
      token,
      userId: user._id,
    });
  } catch (error) {
    console.error("❌ Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user budget
router.get("/budget/:userId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ budget: user.budget || 0 });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update user budget
router.post("/budget", protect, async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.budget = amount;
    await user.save();
    res.json({ budget: user.budget });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
