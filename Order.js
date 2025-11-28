const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  billId: { type: mongoose.Schema.Types.ObjectId, ref: "Bill", default: null }, // Reference to Bill
  items: [
    {
      medicineId: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    }
  ],
  totalPrice: { type: Number, required: true },
  address: { type: String, default: "-" },         // Delivery Address
  paymentMethod: { type: String, default: "-" },   // Payment method
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
