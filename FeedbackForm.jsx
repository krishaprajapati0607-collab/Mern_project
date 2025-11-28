// frontend/src/components/FeedbackForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState({ name: "", email: "", rating: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFeedback({ ...feedback, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/feedbacks", feedback);
      console.log("Saved:", res.data);
      navigate("/feedbacklist");
    } catch (err) {
      console.error("Error posting feedback:", err.response ? err.response.data : err.message);
      alert("Error saving feedback. Check the backend console and browser console.");
    }
  };

  // Inbuilt styles
  const formStyle = {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9"
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

  const selectStyle = {
    ...inputStyle
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "white",
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
    <form style={formStyle} onSubmit={handleSubmit}>
      <h2 style={headingStyle}>Submit Feedback</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={feedback.name}
        onChange={handleChange}
        style={inputStyle}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={feedback.email}
        onChange={handleChange}
        style={inputStyle}
        required
      />

      <select
        name="rating"
        value={feedback.rating}
        onChange={handleChange}
        style={selectStyle}
        required
      >
        <option value="">Select Rating</option>
        <option value="1">1 - Poor</option>
        <option value="2">2 - Fair</option>
        <option value="3">3 - Good</option>
        <option value="4">4 - Very Good</option>
        <option value="5">5 - Excellent</option>
      </select>

      <button type="submit" style={buttonStyle}>Submit Feedback</button>
    </form>
  );
}