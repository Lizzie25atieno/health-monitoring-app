// routes/healthRoutes.js
// Defines routes for creating, reading, updating, deleting health records

const express = require("express");
const {
    getHealthRecords,
    createHealthRecord,
    updateHealthRecord,
    deleteHealthRecord
} = require("../controllers/healthController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// GET all records
router.get("/", protect, getHealthRecords);

// POST new record
router.post("/", protect, createHealthRecord);

// PUT update record by ID
router.put("/:id", protect, updateHealthRecord);

// DELETE record by ID
router.delete("/:id", protect, deleteHealthRecord);

module.exports = router;
