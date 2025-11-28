const express = require("express");
const Consultant = require("../models/Consultant");
const router = express.Router();

// Create consultant
router.post("/", async (req, res) => {
  try {
    const consultant = new Consultant(req.body);
    await consultant.save();
    res.status(201).json(consultant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all consultants
router.get("/", async (req, res) => {
  const consultants = await Consultant.find().populate("department");
  res.json(consultants);
});

// Get consultant by ID
router.get("/:id", async (req, res) => {
  const consultant = await Consultant.findById(req.params.id).populate("department");
  res.json(consultant);
});

// Update consultant
router.put("/:id", async (req, res) => {
  const consultant = await Consultant.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(consultant);
});

// Delete consultant
router.delete("/:id", async (req, res) => {
  await Consultant.findByIdAndDelete(req.params.id);
  res.json({ message: "Consultant deleted" });
});

module.exports = router;
