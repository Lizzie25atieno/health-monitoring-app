// routes/authRoutes.js
// Defines routes for user registration and login

const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// POST route to register users
router.post("/register", registerUser);

// POST route to log users in
router.post("/login", loginUser);

module.exports = router;
