import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", address: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", user);
      alert("✅ Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert("❌ Registration failed!");
      console.error("Error registering:", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Name" minLength="20" maxLength="60" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} required />
        <input type="email" placeholder="Email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} required />
        <input type="text" placeholder="Address" maxLength="400" value={user.address} onChange={e => setUser({ ...user, address: e.target.value })} required />
        <input type="password" placeholder="Password (8-16 chars, 1 uppercase, 1 special char)" minLength="8" maxLength="16" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
