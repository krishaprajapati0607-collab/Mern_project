import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddAppointment() {
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/appointments", {
        patientName,
        email,
        date,
        notes,
      });
      alert("Appointment created successfully!");

      // Clear form
      setPatientName("");
      setEmail("");
      setDate("");
      setNotes("");

      // Redirect to appointments page (update the route as needed)
      navigate("/main");
    } catch (err) {
      console.error("Error creating appointment:", err.response?.data || err);
      alert("Failed to create appointment: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "40px auto", padding: "20px", backgroundColor: "#e6f2ff", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
      <h3 style={{ textAlign: "center", fontSize: "14px" }}>Book Appointment</h3>

      <input
        type="text"
        placeholder="Patient Name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
        required
        style={{ width: "100%", padding: "10px", margin: "8px 0", borderRadius: "4px", border: "1px solid #99ccff" }}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ width: "100%", padding: "10px", margin: "8px 0", borderRadius: "4px", border: "1px solid #99ccff" }}
      />

      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        style={{ width: "100%", padding: "10px", margin: "8px 0", borderRadius: "4px", border: "1px solid #99ccff" }}
      />

      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        style={{ width: "100%", padding: "10px", margin: "8px 0", borderRadius: "4px", border: "1px solid #99ccff" }}
      />

      <button
        type="submit"
        style={{ width: "100%", padding: "10px", backgroundColor: "#3399ff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
      >
        Book Appointment
      </button>
    </form>
  );
}
