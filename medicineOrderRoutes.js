const express = require("express");
const router = express.Router();
const MedicineOrder = require("../models/MedicineOrder");

// Create a new order
router.post("/", async (req, res) => {
  try {
    const { items, totalPrice, address, paymentMethod, billId } = req.body;

    // If address/paymentMethod/billId are missing, set defaults
    const newOrder = new MedicineOrder({
      items,
      totalPrice,
      address: address || "-",
      paymentMethod: paymentMethod || "-",
      billId: billId || "-",
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await MedicineOrder.find()
      .populate("items.medicineId", "name price")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await MedicineOrder.findById(req.params.id)
      .populate("items.medicineId", "name price");
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an order by ID
router.put("/:id", async (req, res) => {
  try {
    const { items, totalPrice, address, paymentMethod, billId } = req.body;
    const order = await MedicineOrder.findByIdAndUpdate(
      req.params.id,
      { items, totalPrice, address, paymentMethod, billId },
      { new: true }
    ).populate("items.medicineId", "name price");

    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an order by ID
router.delete("/:id", async (req, res) => {
  try {
    const order = await MedicineOrder.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;




