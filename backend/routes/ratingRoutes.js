const express = require("express");
const { Rating } = require("../models");

const router = express.Router();

// ✅ Submit or Update a Rating
router.post("/", async (req, res) => {
  try {
    const { storeId, userId, rating } = req.body;

    // Check if user already rated
    let existingRating = await Rating.findOne({ where: { storeId, userId } });

    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
      return res.json({ message: "✅ Rating updated successfully" });
    }

    // Create new rating
    await Rating.create({ storeId, userId, rating });
    res.json({ message: "✅ Rating submitted successfully" });
  } catch (error) {
    console.error("❌ Error submitting rating:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get Ratings for a Store
router.get("/:storeId", async (req, res) => {
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
