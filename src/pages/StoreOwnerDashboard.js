import React, { useState, useEffect } from "react";
import api from "../api";

const StoreOwnerDashboard = ({ storeId }) => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    api.get(`/store-owner/ratings/${storeId}`)
      .then(response => setRatings(response.data))
      .catch(error => console.error("❌ Error fetching ratings:", error));
  }, [storeId]);

  return (
    <div>
      <h1>Store Owner Dashboard</h1>
      <h2>Ratings for Store ID: {storeId}</h2>
      {ratings.map((rating, index) => (
        <p key={index}>User {rating.userId} rated: {rating.rating} ⭐</p>
      ))}
    </div>
  );
};

export default StoreOwnerDashboard;
