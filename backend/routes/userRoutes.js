const express = require("express");
const { User } = require("../models");

const router = express.Router();

// ✅ Get All Users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "address", "role", "createdAt"],
    });

    res.json(users);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
