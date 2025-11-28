const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Create contact
router.post('/', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json(contact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get contact by ID
router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        res.json(contact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update contact
router.put('/:id', async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedContact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete contact
router.delete('/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: 'Contact deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
