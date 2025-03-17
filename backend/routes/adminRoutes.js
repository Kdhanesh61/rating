const express = require("express");
const { User, Store, Rating } = require("../models");

const router = express.Router();

// ✅ Admin Dashboard Stats
router.get("/dashboard", async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();
    res.json({ totalUsers, totalStores, totalRatings });
  } catch (error) {
    console.error("❌ Error fetching admin stats:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// ✅ Add a New Store
router.post("/stores", async (req, res) => {
    try {
      const { name, email, address, ownerId } = req.body;
      const newStore = await Store.create({ name, email, address, ownerId });
      res.json(newStore);
    } catch (error) {
      console.error("❌ Error adding store:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

module.exports = router;
