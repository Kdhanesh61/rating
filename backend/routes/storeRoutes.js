const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Store Routes Working!" });
});

module.exports = router;
