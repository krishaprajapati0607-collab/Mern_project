const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  expiryDate: { type: Date },
});

module.exports = mongoose.model("Medicine", medicineSchema);
