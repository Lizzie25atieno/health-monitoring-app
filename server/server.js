// server.js - ULTRA SIMPLE GUARANTEED VERSION
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// ⚡ ULTRA SIMPLE CORS - NO COMPLEX CONFIG
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  next();
});

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/healthmonitor")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.log("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// Import routes
const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/health", healthRoutes);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ 
    message: "🎉 BACKEND IS WORKING!",
    server: "Express.js",
    database: "MongoDB", 
    status: "✅ All systems operational",
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get("/api/health-check", (req, res) => {
  res.json({ status: "Healthy", time: new Date().toISOString() });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("=".repeat(50));
  console.log("🚀 SERVER STARTED SUCCESSFULLY!");
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌐 Frontend: http://localhost:5173`);
  console.log(`🔗 Backend: http://localhost:${PORT}`);
  console.log(`📊 Test: http://localhost:${PORT}/api/test`);
  console.log("=".repeat(50));
});