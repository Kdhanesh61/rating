import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const RatingPage = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/stores`)
      .then((response) => {
        setStores(response.data);
      })
      .catch((error) => {
        console.error("❌ Error fetching stores:", error);
      });
  }, []);

  return (
    <div>
      <h1>Store Ratings</h1>
      {stores.map((store) => (
        <div key={store.id}>
          <h3>{store.name}</h3>
          <p>Address: {store.address}</p>
          <p>Average Rating: {store.avgRating || "No ratings yet"}</p>
        </div>
      ))}
    </div>
  );
};

export default RatingPage;
