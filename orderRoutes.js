const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// 🟢 Create a new order
router.post("/", async (req, res) => {
  try {
    const { billId, items, totalPrice, address, paymentMethod } = req.body;
    const order = new Order({ billId, items, totalPrice, address, paymentMethod });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟢 Get all orders (optionally populate bill info)
router.get("/", async (req, res) => {
  try {
    const populateBill = req.query.populateBill === "true";

    let orders;
    if (populateBill) {
      orders = await Order.find()
        .populate("billId")
        .populate("items.medicineId", "name price")
        .sort({ createdAt: -1 });
    } else {
      orders = await Order.find()
        .populate("items.medicineId", "name price")
        .sort({ createdAt: -1 });
    }

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// 🔴 Delete an order by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "✅ Order deleted successfully" });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ error: "Failed to delete order" });
  }
});

module.exports = router;
