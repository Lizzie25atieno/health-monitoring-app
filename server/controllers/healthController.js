// controllers/healthController.js
// Handles CRUD operations for health records

const HealthRecord = require("../models/HealthRecord");

// @desc   Get all health records for logged-in user
// @route  GET /api/health
// @access Private
exports.getHealthRecords = async (req, res) => {
    const records = await HealthRecord.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(records);
};

// @desc   Create a new health record
// @route  POST /api/health
// @access Private
exports.createHealthRecord = async (req, res) => {
    const { date, weight, bloodPressure, heartRate, notes } = req.body;

    const record = new HealthRecord({
        user: req.user._id,
        date: date || new Date(),
        weight,
        bloodPressure,
        heartRate,
        notes
    });

    const createdRecord = await record.save();
    res.status(201).json(createdRecord);
};

// @desc   Update a health record
// @route  PUT /api/health/:id
// @access Private
exports.updateHealthRecord = async (req, res) => {
    const { date, weight, bloodPressure, heartRate, notes } = req.body;

    const record = await HealthRecord.findById(req.params.id);

    if (!record) {
        return res.status(404).json({ message: "Record not found" });
    }

    // ensure the logged-in user owns the record
    if (record.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "Not authorized" });
    }

    // Update fields if provided
    if (date) record.date = new Date(date);
    if (weight) record.weight = weight;
    if (bloodPressure) record.bloodPressure = bloodPressure;
    if (heartRate) record.heartRate = heartRate;
    if (notes) record.notes = notes;

    const updatedRecord = await record.save();
    res.json(updatedRecord);
};

// @desc   Delete a health record
// @route  DELETE /api/health/:id
// @access Private
exports.deleteHealthRecord = async (req, res) => {
    const record = await HealthRecord.findById(req.params.id);

    if (!record) {
        return res.status(404).json({ message: "Record not found" });
    }

    // ensure the logged-in user owns the record
    if (record.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "Not authorized" });
    }

    await record.deleteOne(); 
    res.json({ message: "Record removed" });
};