const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },                 // Doctor name
  specialization: { type: String, required: true },       // Specialization
  availability: { type: String },                         // e.g., Mon-Fri, 10 AM - 2 PM
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", default: null }, // optional
  email: { type: String, unique: true, sparse: true },    // optional, unique
  phone: { type: String, default: "" },                  // optional
  experience: { type: Number, default: 0 },              // optional
  availableDays: [{ type: String }],                     // optional array of strings
  photo: { type: String, default: "" },                 // optional image URL
}, { timestamps: true });                                 // adds createdAt and updatedAt

module.exports = mongoose.model("Doctor", doctorSchema);  //➡️ Creates Mongoose Model called Doctor
