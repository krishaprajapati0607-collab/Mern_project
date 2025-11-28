import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
    const [contact, setContact] = useState({ name: '', email: '', message: '' });

    const handleChange = e => setContact({ ...contact, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/contacts', contact);
            alert("Message sent!");
            setContact({ name: '', email: '', message: '' });
        } catch (err) {
            alert("Error sending message");
        }
    };

    // Inbuilt CSS
    const formStyle = {
        maxWidth: "500px",
        margin: "50px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
        fontFamily: "Arial, sans-serif"
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px",
        boxSizing: "border-box"
    };

    const textareaStyle = {
        ...inputStyle,
        minHeight: "100px",
        resize: "vertical"
    };

    const buttonStyle = {
        width: "100%",
        padding: "12px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        fontSize: "16px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px"
    };

    const headingStyle = {
        textAlign: "center",
        marginBottom: "20px",
        color: "#333"
    };

    return (
        <div style={formStyle}>
            <h2 style={headingStyle}>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={contact.name}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={contact.email}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
                <textarea
                    name="message"
                    placeholder="Message"
                    value={contact.message}
                    onChange={handleChange}
                    style={textareaStyle}
                    required
                />
                <button type="submit" style={buttonStyle}>Send</button>
            </form>
        </div>
    );
};

export default ContactForm;

