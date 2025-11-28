const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'example.com', // replace with your email
        pass: 'example123'   // replace with app password
    }
});

// Request OTP
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        await user.save();

        // Send email
        await transporter.sendMail({
            from: '"Support" <example.com>', // replace with your email
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`
        });

        res.json({ message: 'OTP sent to email' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email, otp });
        if (!user) return res.status(400).json({ message: 'Invalid OTP' });
        res.json({ message: 'OTP verified' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const user = await User.findOne({ email, otp });
        if (!user) return res.status(400).json({ message: 'Invalid OTP' });

        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        user.otp = null; // clear OTP
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
