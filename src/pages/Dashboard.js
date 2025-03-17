import React, { useEffect, useState } from "react";
import api from "../api";
import Store from "../components/Store";  // ✅ Import Store component

const Dashboard = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    api.get("/stores")
      .then(response => {
        setStores(response.data);
      })
      .catch(error => console.error("❌ Error fetching stores:", error));
  }, []);

  return (
    <div>
      <h1>Store Ratings</h1>
      {stores.map(store => (
        <Store key={store.id} store={store} />
      ))}
    </div>
  );
};

export default Dashboard;
