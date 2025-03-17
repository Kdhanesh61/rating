import React, { useState } from "react";
import api from "../api";

const AddStore = () => {
  const [store, setStore] = useState({ name: "", email: "", address: "", ownerId: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/admin/stores", store)
      .then(() => alert("✅ Store Added Successfully"))
      .catch(error => console.error("❌ Error adding store:", error));
  };

  return (
    <div>
      <h2>Add New Store</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Store Name" onChange={e => setStore({ ...store, name: e.target.value })} />
        <input type="email" placeholder="Email" onChange={e => setStore({ ...store, email: e.target.value })} />
        <input type="text" placeholder="Address" onChange={e => setStore({ ...store, address: e.target.value })} />
        <input type="text" placeholder="Owner ID" onChange={e => setStore({ ...store, ownerId: e.target.value })} />
        <button type="submit">Add Store</button>
      </form>
    </div>
  );
};

export default AddStore;
