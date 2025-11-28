// backend/routes/admin.js
const express = require("express");
const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Department = require("../models/Department");
const Appointment = require("../models/Appointment");

const router = express.Router();

// Get dashboard stats (exclude Admins from user count)
router.get("/stats", async (req, res) => {
  try {
    // Only count users with role 'Patient' (or not 'Admin')
    const usersCount = await User.countDocuments({ role: { $ne: "Admin" } });
    const doctorsCount = await Doctor.countDocuments();
    const departmentsCount = await Department.countDocuments();
    const appointmentsCount = await Appointment.countDocuments();

    res.json({
      users: usersCount,
      doctors: doctorsCount,
      departments: departmentsCount,
      appointments: appointmentsCount,
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
