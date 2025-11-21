// models/HealthRecord.js
// Stores individual health tracking entries for a user

const mongoose = require("mongoose");

const healthRecordSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",                             // links record to a user
            required: true
        },
        date: { 
            type: Date, 
            default: Date.now 
        },                               // date of the record
        weight: Number,                               // example metric
        bloodPressure: String,                        // example metric: "120/80"
        heartRate: Number,                            // example metric
        notes: String                                 // optional notes/symptoms
    },
    { timestamps: true }                              // adds createdAt & updatedAt
);

module.exports = mongoose.model("HealthRecord", healthRecordSchema);