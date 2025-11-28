const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  items: [
    {
      medicineId: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bill", billSchema);
