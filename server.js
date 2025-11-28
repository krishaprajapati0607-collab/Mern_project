// Create folder
// run the command 
// npm init -y
// npm install express
// serverrun - node server.js


//------------------------------------------------------------
//Create API
//------------------------------------------------------------
// npm init -y
// npm install express
// npm install nodemon
// npm run dev


// Register → POST http://localhost:8000/api/users/register
// Login → POST http://localhost:8000/api/users/login
// Get all users → GET http://localhost:8000/api/users
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

// ========================
// 🔹 Middleware
// ========================
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json()); // ✅ Important: parse JSON

// ========================
// 🔹 MongoDB connection
// ========================
const MONGO_URI = ``; //replace with your username and password of mongoDB // add your mongoose path / and add databasename
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ========================
// 🔹 Test route
// ========================
app.get("/", (req, res) => {
  res.send("🚀 Server is up and running.");
});

// ========================
// 🔹 Routes Import
// ========================
const userRoutes = require("./routes/users");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");

const appointmentRoutes = require("./routes/appointmentRoutes");

const feedbackRoutes = require("./routes/feedbackRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const consultantRoutes = require("./routes/consultantRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const medicineOrderRoutes = require("./routes/medicineOrderRoutes");
const billRoutes = require("./routes/billRoutes");
const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require("./routes/admin");

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/consultants", consultantRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/medicine-orders", medicineOrderRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/auth", authRoutes);

// ========================
// 🔹 Serve uploads folder for images
// ========================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ========================
// 🔹 Start server
// ========================
const PORT = 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



