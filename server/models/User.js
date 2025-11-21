// models/User.js
// Defines the user schema for MongoDB

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },                      // user's full name
        email: { type: String, required: true, unique: true },       // login email
        password: { type: String, required: true }                   // hashed password
    },
    { timestamps: true }                                            // adds createdAt & updatedAt
);

module.exports = mongoose.model("User", userSchema);
