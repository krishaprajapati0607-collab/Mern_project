const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String }, // stores filename
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", departmentSchema);
