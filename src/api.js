import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:2012/api",  // ✅ Ensure this is correct
  headers: { "Content-Type": "application/json" }
});

export default api;
