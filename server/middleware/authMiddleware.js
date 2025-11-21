// middleware/authMiddleware.js - CRITICAL FIX
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    console.log("🛡️ Auth Middleware - Headers:", req.headers);
    
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log("✅ Token received:", token ? "Yes" : "No");

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("✅ Token decoded - User ID:", decoded.id);

            // Find the user by id and attach to request
            req.user = await User.findById(decoded.id).select("-password");
            console.log("✅ User found:", req.user ? req.user.email : "No user");

            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }

            next();
            
        } catch (error) {
            console.log("❌ Token verification error:", error.message);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        console.log("❌ No token provided in authorization header");
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

module.exports = protect;