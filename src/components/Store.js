import React, { useState, useEffect } from "react";
import api from "../api";  // ✅ Ensure correct API setup

const Store = ({ store }) => {
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    api.get(`/ratings/${store.id}`)
      .then(response => {
        if (response.data.length > 0) {
          const avgRating = response.data.reduce((sum, r) => sum + r.rating, 0) / response.data.length;
          setRating(avgRating);
        }
      })
      .catch(error => console.error("❌ Error fetching rating:", error));
  }, [store.id]);

  const submitRating = (newRating) => {
    api.post("/ratings", { storeId: store.id, userId: "test-user-id", rating: newRating })
      .then(() => {
        setUserRating(newRating);
        alert("✅ Your rating has been submitted!");
      })
      .catch(error => console.error("❌ Error submitting rating:", error));
  };

  return (
    <div className="store-card">
      <h2>{store.name}</h2>
      <p>📍 {store.address}</p>
      <p>⭐ Average Rating: {rating.toFixed(1)}</p>

      <h4>Your Rating:</h4>
      {[1, 2, 3, 4, 5].map(num => (
        <button
          key={num}
          className={userRating === num ? "selected" : ""}
          onClick={() => submitRating(num)}
        >
          ⭐ {num}
        </button>
      ))}
    </div>
  );
};

export default Store;
