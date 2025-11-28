import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1-email, 2-otp, 3-reset
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const sendOtp = async () => {
        try {
            await axios.post('http://localhost:8000/api/auth/forgot-password', { email });
            alert('OTP sent to your email');
            setStep(2);
        } catch (err) {
            alert(err.response?.data?.message || 'Error sending OTP');
        }
    };

    const verifyOtp = async () => {
        try {
            await axios.post('http://localhost:8000/api/auth/verify-otp', { email, otp });
            alert('OTP verified');
            setStep(3);
        } catch (err) {
            alert(err.response?.data?.message || 'Invalid OTP');
        }
    };

    const resetPassword = async () => {
        try {
            await axios.post('http://localhost:8000/api/auth/reset-password', { email, otp, newPassword });
            alert('Password reset successful. You can now login.');
            setStep(1);
            setEmail('');
            setOtp('');
            setNewPassword('');
            navigate("/login"); // ✅ redirect to login page
        } catch (err) {
            alert(err.response?.data?.message || 'Error resetting password');
        }
    };

    // Inbuilt styles
    const formStyle = {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif'
    };
    const inputStyle = { width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' };
    const buttonStyle = { width: '100%', padding: '12px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer', marginTop: '10px' };
    const headingStyle = { textAlign: 'center', marginBottom: '20px', color: '#333' };

    return (
        <div style={formStyle}>
            {step === 1 && (
                <>
                    <h2 style={headingStyle}>Forgot Password</h2>
                    <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
                    <button onClick={sendOtp} style={buttonStyle}>Send OTP</button>
                </>
            )}
            {step === 2 && (
                <>
                    <h2 style={headingStyle}>Enter OTP</h2>
                    <input type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} style={inputStyle} />
                    <button onClick={verifyOtp} style={buttonStyle}>Verify OTP</button>
                </>
            )}
            {step === 3 && (
                <>
                    <h2 style={headingStyle}>Reset Password</h2>
                    <input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} style={inputStyle} />
                    <button onClick={resetPassword} style={buttonStyle}>Reset Password</button>
                </>
            )}
        </div>
    );
};

export default ForgotPassword;
