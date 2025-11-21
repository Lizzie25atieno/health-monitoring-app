// api/api.js - UPDATED VERSION
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Make sure this matches your backend
  timeout: 10000, // Add timeout
});

// Request interceptor - ADD DEBUG LOGS
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  console.log("🔐 API Interceptor - Making request to:", req.url);
  console.log("🔐 Token available:", token ? "YES" : "NO");
  
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    console.log("✅ Authorization header set with token");
  }
  
  console.log("📨 Full request config:", {
    url: req.url,
    method: req.method,
    headers: req.headers,
    data: req.data
  });
  
  return req;
});

// Response interceptor - ADD DEBUG LOGS
API.interceptors.response.use(
  (response) => {
    console.log("✅ API Success:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.log("❌ API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      response: error.response?.data
    });
    
    if (error.response?.status === 401) {
      console.log("🔐 401 Unauthorized - clearing tokens");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    
    return Promise.reject(error);
  }
);

export default API;