const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true }, // ✅ Added name
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  phone: { type: String },
  address: { type: String },
  medicalHistory: [{ type: String }],
});

module.exports = mongoose.model("Patient", patientSchema);
