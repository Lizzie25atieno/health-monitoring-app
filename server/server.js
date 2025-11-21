// server.js - FOR PRODUCTION DEPLOYMENT
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();

const app = express();

// CORS configuration for production
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-health-app.netlify.app" // ← Update with your actual Netlify URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"]
}));

app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`📍 ${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB
connectDB();

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/health", require("./routes/healthRoutes"));

// Health check route
app.get("/api/health-check", (req, res) => {
  res.json({ 
    status: "Healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// Test route
app.get("/api/test", (req, res) => {
  res.json({ 
    message: "✅ Backend is working!",
    server: "Express.js",
    database: "MongoDB", 
    status: "All systems operational"
  });
});

//  Serve static files in production (CORRECT SYNTAX)
if (process.env.NODE_ENV === "production") {
  // Serve static files from client dist directory
  app.use(express.static(path.join(__dirname, "../client/dist")));
  
  //  Use proper wildcard syntax
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ 
    message: "Something went wrong!",
    ...(process.env.NODE_ENV === "development" && { error: err.message })
  });
});

// 404 handler for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health-check`);
});