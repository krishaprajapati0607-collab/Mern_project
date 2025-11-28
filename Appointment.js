const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  email: { type: String, required: true },
  doctorName: { type: String, default: "" }, // optional 
  date: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" },
  notes: { type: String, default: "" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // optional
});

module.exports = mongoose.model("Appointment", appointmentSchema);



// const mongoose = require("mongoose");

// const appointmentSchema = new mongoose.Schema({
//   patientName: { type: String, required: true },  // Name of the patient
//   email: { type: String, required: true },        // Patient email
//   date: { type: Date, required: true },           // Appointment date & time
//   status: { 
//     type: String, 
//     enum: ["Pending", "Confirmed", "Cancelled"], 
//     default: "Pending" 
//   },                                              // Appointment status
//   notes: { type: String },                        // Optional notes
// }, { timestamps: true });                         // Automatically adds createdAt & updatedAt

// module.exports = mongoose.model("Appointment", appointmentSchema);
