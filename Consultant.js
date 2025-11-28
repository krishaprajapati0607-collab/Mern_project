const mongoose = require("mongoose");

const consultantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expertise: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  phone: { type: String },
  email: { type: String, unique: true },
});

module.exports = mongoose.model("Consultant", consultantSchema);
