// utils/generateToken.js
// Creates a JWT token containing the user ID

const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    // signs token using user ID and secret key
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"        // token valid for 30 days
    });
};

module.exports = generateToken;
