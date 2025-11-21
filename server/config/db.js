// config/db.js
// Connects to MongoDB using Mongoose

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // connects to MongoDB using the URI from .env
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);  // stops server if database fails
    }
};

module.exports = connectDB;
