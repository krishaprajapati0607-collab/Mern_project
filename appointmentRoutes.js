const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Create a new appointment
router.post("/", async (req, res) => {
  try {
    const { patientName, email, date, notes } = req.body;

    // Only check required fields that the form sends
    if (!patientName || !email || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newAppointment = new Appointment({
      patientName,
      email,
      date,
      notes, // optional
    });

    await newAppointment.save();
    res.status(201).json({ message: "Appointment created successfully", appointment: newAppointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all appointments (Admin)
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get appointments for a specific user (optional, if you later add auth)
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const appointments = await Appointment.find({ userId });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update appointment status
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "Status is required" });

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    res.json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete appointment
router.delete("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
