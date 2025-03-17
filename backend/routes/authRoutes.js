const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models"); // Ensure User model is correctly imported
const router = express.Router();

// ✅ User Login (Generate Token)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    console.log(`🔍 Checking for user: ${email}`);

    // ✅ Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("❌ User not found in database");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log(`✅ User found: ${user.email}`);
    
    // ✅ Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`🔍 Password Match Result: ${isMatch}`);

    if (!isMatch) {
      console.log(`❌ Password mismatch for user: ${user.email}`);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "defaultsecret", // Ensure JWT_SECRET is set
      { expiresIn: "1h" }
    );

    // ✅ Return token and user info
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("❌ Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router; // ✅ Fix: Export the router
