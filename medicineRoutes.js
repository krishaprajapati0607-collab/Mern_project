const express = require("express");
const Medicine = require("../models/Medicine");
const router = express.Router();

// Create medicine
router.post("/", async (req, res) => {
  try {
    const medicine = new Medicine(req.body);
    await medicine.save();
    res.status(201).json(medicine);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all medicines
router.get("/", async (req, res) => {
  const medicines = await Medicine.find();
  res.json(medicines);
});

// Get medicine by ID
router.get("/:id", async (req, res) => {
  const medicine = await Medicine.findById(req.params.id);
  res.json(medicine);
});

// Update medicine
router.put("/:id", async (req, res) => {
  const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(medicine);
});

// Delete medicine
router.delete("/:id", async (req, res) => {
  await Medicine.findByIdAndDelete(req.params.id);
  res.json({ message: "Medicine deleted" });
});

module.exports = router;
