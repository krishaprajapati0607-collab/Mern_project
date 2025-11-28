// backend/models/Feedback.js
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" }, // optional
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },   // optional
  name: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);