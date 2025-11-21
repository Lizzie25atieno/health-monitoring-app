// controllers/authController.js
// Handles user registration and login logic

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// registers a new user
exports.registerUser = async (req, res) => {
    try {
        console.log("=== 🔐 TOKEN GENERATION DEBUG ===");
        const { name, email, password } = req.body;     // gets body data

    // checks if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    // hashes password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // creates new user record
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });
    
    console.log("👤 User created with ID:", user._id);
        
        // TOKEN GENERATION
        const token = generateToken(user._id);
        console.log("✅ Token generated:", token);
        console.log("🔑 JWT Secret used:", process.env.JWT_SECRET);
        console.log("📏 Token length:", token.length);
        
    // sends user details + token
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
    });
            
    } catch (error) {
        console.log("❌ Registration error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// logs in existing user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;   // retrieves login info

    const user = await User.findOne({ email });

    // checks if user exists and password matches
    if (user && (await bcrypt.compare(password, user.password))) {
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    }

    res.status(400).json({ message: "Invalid email or password" });
};
