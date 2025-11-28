const express = require("express");
const Patient = require("../models/Patient");
const router = express.Router();

// Create patient
router.post("/", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all patients
router.get("/", async (req, res) => {
  const patients = await Patient.find().populate("user");
  res.json(patients);
});

// Get patient by ID
router.get("/:id", async (req, res) => {
  const patient = await Patient.findById(req.params.id).populate("user");
  res.json(patient);
});

// Update patient
router.put("/:id", async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(patient);
});

// Delete patient
router.delete("/:id", async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.json({ message: "Patient deleted" });
});

module.exports = router;
