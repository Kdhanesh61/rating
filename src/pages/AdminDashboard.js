import React, { useState, useEffect } from "react";
import api from "../api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });

  useEffect(() => {
    api.get("/admin/dashboard")
      .then(response => setStats(response.data))
      .catch(error => console.error("❌ Error fetching admin stats:", error));
  }, []);

  return (
    <div>
      <h1>📊 Admin Dashboard</h1>
      <p>👥 Total Users: {stats.totalUsers}</p>
      <p>🏬 Total Stores: {stats.totalStores}</p>
      <p>⭐ Total Ratings: {stats.totalRatings}</p>
    </div>
  );
};

export default AdminDashboard;
