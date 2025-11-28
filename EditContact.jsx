import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditContact() {
  const { id } = useParams();
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/contacts/${id}`);
        setContact({
          name: res.data.name,
          email: res.data.email,
          message: res.data.message,
        });
      } catch (err) {
        console.error("Error fetching contact:", err);
        alert("Could not load contact");
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, [id]);

  const handleChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/contacts/${id}`, contact);
      navigate("/contactlist"); // redirect to contact list page
    } catch (err) {
      console.error("Error updating contact:", err);
      alert("Update failed");
    }
  };

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>
    );

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

  return (
    <form onSubmit={handleSubmit} style={formContainerStyle}>
      <h2 style={headingStyle}>Edit Contact</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={contact.name}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={contact.email}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <textarea
        name="message"
        placeholder="Message"
        value={contact.message}
        onChange={handleChange}
        required
        rows={4}
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>
        Update Contact
      </button>
    </form>
  );
}
