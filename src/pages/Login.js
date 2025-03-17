import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data;
      
      // ✅ Store token & user role
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      // ✅ Redirect based on role
      if (user.role === "admin") navigate("/admin/dashboard");
      else if (user.role === "owner") navigate("/store-owner/dashboard");
      else navigate("/user/dashboard");

    } catch (error) {
      alert("❌ Login failed! Check your credentials.");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
