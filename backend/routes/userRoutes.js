const express = require("express");
const router = express.Router();
const User = require("../models/User");

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
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
