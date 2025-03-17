import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import StoreOwnerDashboard from "./pages/StoreOwnerDashboard";
import UserDashboard from "./pages/UserDashboard"; // ✅ Add User Dashboard

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/store-owner/dashboard" element={<StoreOwnerDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />  {/* ✅ Add User Dashboard */}
        <Route path="*" element={<h1>404 Not Found</h1>} /> {/* Catch all unknown routes */}
      </Routes>
    </Router>
  );
};

export default App;
