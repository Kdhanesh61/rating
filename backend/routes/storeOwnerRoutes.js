const express = require("express");
const { Rating } = require("../models");

const router = express.Router();  // ✅ Add this line

// ✅ Get Ratings for a Store
router.get("/ratings/:storeId", async (req, res) => {
  try {
    const { storeId } = req.params;
    const ratings = await Rating.findAll({ where: { storeId } });
    res.json(ratings);
  } catch (error) {
    console.error("❌ Error fetching ratings:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
