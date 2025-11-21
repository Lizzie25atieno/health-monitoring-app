// server.js - ULTRA SIMPLE PRODUCTION VERSION
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Simple CORS - allows all origins in production
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/health", require("./routes/healthRoutes"));

// Health check
app.get("/api/health-check", (req, res) => {
  res.json({ 
    status: "Healthy", 
    message: "Backend is running successfully!",
    timestamp: new Date().toISOString()
  });
});

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ Backend deployment successful!" });
});

// Handle root route
app.get("/", (req, res) => {
  res.json({ 
    message: "Health Monitor API",
    version: "1.0.0",
    status: "Running",
    endpoints: {
      auth: "/api/auth",
      health: "/api/health", 
      test: "/api/test"
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server successfully started on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || "development"}`);
});