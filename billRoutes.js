const express = require("express");
const router = express.Router();
const Bill = require("../models/Bill");

// Create bill
router.post("/", async (req, res) => {
  try {
    const { items, totalPrice } = req.body;
    const bill = new Bill({ items, totalPrice });
    await bill.save();
    res.status(201).json(bill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all bills
router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find().populate("items.medicineId", "name price").sort({ createdAt: -1 });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single bill by ID
router.get("/:id", async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id).populate("items.medicineId", "name price");
    if (!bill) return res.status(404).json({ error: "Bill not found" });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
