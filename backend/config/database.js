const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("store_rating_db", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
  logging: false,  // Set to true for debugging queries
});

sequelize
  .authenticate()
  .then(() => console.log("✅ Connected to PostgreSQL Database"))
  .catch((err) => console.error("❌ Unable to connect to database:", err));

module.exports = sequelize;
