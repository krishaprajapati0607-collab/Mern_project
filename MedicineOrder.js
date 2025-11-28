const mongoose = require("mongoose");

const medicineOrderSchema = new mongoose.Schema({
  items: [
    {
      medicineId: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  billId: { type: String, default: "-" },          // Bill ID
  address: { type: String, default: "-" },         // Delivery Address
  paymentMethod: { type: String, default: "-" },   // Payment method
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MedicineOrder", medicineOrderSchema);
