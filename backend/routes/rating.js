const express = require("express");
const { Rating, Store } = require("../models");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

// ⭐ Submit a Rating
router.post("/", authenticate, async (req, res) => {
  try {
    const { store_id, rating, review } = req.body;
    const store = await Store.findByPk(store_id);
    if (!store) return res.status(404).json({ message: "Store not found!" });

    const newRating = await Rating.create({ user_id: req.user.id, store_id, rating, review });
    res.status(201).json(newRating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 📊 Get All Ratings for a Store
router.get("/:store_id", async (req, res) => {
  try {
    const ratings = await Rating.findAll({ where: { store_id: req.params.store_id } });
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📝 Update Rating (Only User who created it)
router.put("/:id", authenticate, async (req, res) => {
  try {
    const rating = await Rating.findByPk(req.params.id);
    if (!rating) return res.status(404).json({ message: "Rating not found!" });
    if (rating.user_id !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized!" });
    }
    await rating.update(req.body);
    res.json({ message: "Rating updated!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ❌ Delete Rating (Only User who created it)
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const rating = await Rating.findByPk(req.params.id);
    if (!rating) return res.status(404).json({ message: "Rating not found!" });
    if (rating.user_id !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized!" });
    }
    await rating.destroy();
    res.json({ message: "Rating deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
