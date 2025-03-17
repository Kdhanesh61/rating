const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./config/database");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// ✅ Import and Register Routes (No Duplicates)
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/ratings", require("./routes/ratingRoutes"));
app.use("/api/stores", require("./routes/storeRoutes")); // ✅ Ensure correct file name
app.use("/api/store-owner", require("./routes/storeOwnerRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// ✅ Sync Database
sequelize.sync({ force: false })
  .then(() => console.log("✅ Database & tables synced!"))
  .catch((err) => console.error("❌ Error syncing database:", err));

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
  
// ✅ Start Server
const PORT = process.env.PORT || 3001;  // Make sure it's 3001
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("Welcome to Store Rating API");
});
