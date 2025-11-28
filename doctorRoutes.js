const express = require("express");
const Doctor = require("../models/Doctor");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ========================
// 🔹 Ensure uploads folder exists
// ========================
const uploadFolder = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// ========================
// 🔹 Multer setup for image upload
// ========================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    // Prepend timestamp to avoid duplicate filenames
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ========================
// 🔹 Create doctor with image
// ========================
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const doctor = new Doctor({
      ...req.body,
      photo: req.file ? req.file.filename : "",
    });
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ========================
// 🔹 Get all doctors
// ========================
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("department");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========================
// 🔹 Get doctor by ID
// ========================
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate("department");
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========================
// 🔹 Update doctor
// ========================
router.put("/:id", upload.single("photo"), async (req, res) => {
  try {
    const updatedData = { ...req.body };

    // If new photo uploaded, replace old one
    if (req.file) {
      updatedData.photo = req.file.filename;
    }

    const doctor = await Doctor.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ========================
// 🔹 Delete doctor
// ========================
router.delete("/:id", async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
