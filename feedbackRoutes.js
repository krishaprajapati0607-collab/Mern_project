
// backend/routes/feedbackRoutes.js
const express = require("express");
const Feedback = require("../models/Feedback");
const router = express.Router();

// Create feedback
router.post("/", async (req, res) => {
  try {
    const { name, email, rating, patient, doctor } = req.body;
    if (!name || !email || !rating) {
      return res.status(400).json({ error: "name, email and rating are required" });
    }
    const feedback = new Feedback({ name, email, rating, patient, doctor });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all feedbacks
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single feedback by id
router.get("/:id", async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate("patient")
      .populate("doctor");
    if (!feedback) return res.status(404).json({ error: "Feedback not found" });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update feedback
router.put("/:id", async (req, res) => {
  try {
    const updated = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Feedback not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete feedback
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Feedback.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Feedback not found" });
    res.json({ message: "Feedback deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;