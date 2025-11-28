// frontend/src/components/EditFeedback.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditFeedback() {
  const { id } = useParams();
  const [feedback, setFeedback] = useState({ name: "", email: "", rating: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/feedbacks/${id}`);
        setFeedback({ name: res.data.name, email: res.data.email, rating: res.data.rating });
      } catch (err) {
        console.error("Error fetching feedback:", err);
        alert("Could not load feedback");
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, [id]);

  const handleChange = (e) => setFeedback({ ...feedback, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/feedbacks/${id}`, feedback);
      navigate("/feedbacklist");
    } catch (err) {
      console.error("Error updating feedback:", err);
      alert("Update failed");
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  // Inbuilt styles
  const formContainerStyle = {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  };

  const selectStyle = { ...inputStyle };

  return (
    <form onSubmit={handleSubmit} style={formContainerStyle}>
      <h2 style={headingStyle}>Edit Feedback</h2>
      <input type="text" name="name" value={feedback.name} onChange={handleChange} required style={inputStyle} />
      <input type="email" name="email" value={feedback.email} onChange={handleChange} required style={inputStyle} />
      <select name="rating" value={feedback.rating} onChange={handleChange} required style={selectStyle}>
        <option value="">Select Rating</option>
        <option value="1">1 - Poor</option>
        <option value="2">2 - Fair</option>
        <option value="3">3 - Good</option>
        <option value="4">4 - Very Good</option>
        <option value="5">5 - Excellent</option>
      </select>
      <button type="submit" style={buttonStyle}>Update Feedback</button>
    </form>
  );
}