const express = require("express");
const { Store } = require("../models");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

// 🏪 Get All Stores
router.get("/", async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ➕ Create a Store (Only Store Owner)
router.post("/", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "store_owner") {
      return res.status(403).json({ message: "Access denied!" });
    }
    const { name, address } = req.body;
    const store = await Store.create({ name, address, owner_id: req.user.id });
    res.status(201).json(store);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 🔍 Get Store by ID
router.get("/:id", async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) return res.status(404).json({ message: "Store not found!" });
    res.json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📝 Update Store (Only Owner)
router.put("/:id", authenticate, async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) return res.status(404).json({ message: "Store not found!" });
    if (store.owner_id !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized!" });
    }
    await store.update(req.body);
    res.json({ message: "Store updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ❌ Delete Store (Only Owner)
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) return res.status(404).json({ message: "Store not found!" });
    if (store.owner_id !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized!" });
    }
    await store.destroy();
    res.json({ message: "Store deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
