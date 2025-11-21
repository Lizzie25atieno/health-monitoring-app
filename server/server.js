const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  // Netlify domains
  /\.netlify\.app$/
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    for (let i = 0; i < allowedOrigins.length; i++) {
      if (typeof allowedOrigins[i] === 'string') {
        if (origin === allowedOrigins[i]) return callback(null, true);
      } else if (allowedOrigins[i] instanceof RegExp) {
        if (allowedOrigins[i].test(origin)) return callback(null, true);
      }
    }
    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"]
}));

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