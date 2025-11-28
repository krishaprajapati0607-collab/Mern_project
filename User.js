// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // will store hashed password
  role: {
    type: String,
    enum: ["Admin", "Patient"],  // only these 2 roles are allowed
    default: "Patient"
  },
  lastLogin: { type: Date }, 
  otp: { type: String },

});

module.exports = mongoose.model("User", userSchema);
