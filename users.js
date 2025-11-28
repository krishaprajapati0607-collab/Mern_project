// backend/routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");  // MongoDB model for users
const bcrypt = require("bcryptjs");      // to hash passwords
const jwt = require("jsonwebtoken");     // for authentication
const cookieParser = require("cookie-parser"); // to manage cookies

// ========================
// 🔹 Middleware for JWT. JWT_SECRET → secret key to sign tokens (should be hidden in .env file in real apps).
// ========================
const JWT_SECRET = "your_secret_key"; // use environment variable in production

router.use(cookieParser());

// ========================
// REGISTER
// ========================
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "Patient",
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
// ========================
// LOGIN
// ========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // ✅ Update last login date/time
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send token in httpOnly cookie
    res
      .cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }) // 1 day
      .json({
        message: "Login successful",
        user: { 
          id: user._id, 
          username: user.username, 
          email: user.email, 
          role: user.role,
          lastLogin: user.lastLogin, // include login time in response
        },
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// ========================
// GET CURRENT USER (from JWT token in cookie)
// ========================
router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Not authenticated" });

    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ user: decoded });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// ========================
// LOGOUT
// ========================
router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
});

// ========================
// GET ALL USERS
// ========================
// Get all patients
router.get("/", async (req, res) => {
  try {
    const users = await User.find({ role: "Patient" });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ========================
// GET user by ID
// ========================
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // exclude password
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;