const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const Department = require("../models/Department");

// ------------------- Multer storage -------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Serve uploaded files
router.use("/uploads", express.static("uploads"));

// ------------------- CREATE -------------------
router.post("/", upload.single("image"), async (req, res) => {
  const department = new Department({
    name: req.body.name,
    description: req.body.description,
    image: req.file ? req.file.filename : null,
  });
  await department.save();
  res.status(201).json(department);
});

// ------------------- READ ALL -------------------
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- READ ONE -------------------
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });

    const department = await Department.findById(id);
    if (!department) return res.status(404).json({ error: "Department not found" });

    res.json(department);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- UPDATE -------------------
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });

    const updatedData = { name: req.body.name, description: req.body.description };
    if (req.file) updatedData.image = req.file.filename;

    const department = await Department.findByIdAndUpdate(id, updatedData, { new: true });
    if (!department) return res.status(404).json({ error: "Department not found" });

    res.json(department);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ------------------- DELETE -------------------
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });

    const department = await Department.findByIdAndDelete(id);
    if (!department) return res.status(404).json({ error: "Department not found" });

    res.json({ message: "Department deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
