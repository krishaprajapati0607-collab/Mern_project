import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DoctorProfile() {
  const { id } = useParams(); 
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();  
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/doctors/${id}`)
      .then((res) => setDoctor(res.data))
      .catch((err) => console.log("Error fetching doctor:", err));
  }, [id]);

  if (!doctor) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  }

  const styles = {
    container: {
      padding: "1.5rem",
      background: "#f0ffff",
      minHeight: "100vh",
    },
    card: {
      background: "#ffffff",
      maxWidth: "450px",
      margin: "0 auto",
      padding: "2rem",
      borderRadius: "14px",
      boxShadow: "0px 5px 18px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
    photo: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      objectFit: "cover",
      marginBottom: "1rem",
    },
    name: { fontSize: "1.5rem", fontWeight: 700, color: "#2c7a7b", marginBottom: "0.5rem" },
    field: { margin: "6px 0", fontSize: "1rem", color: "#444" },
    strong: { fontWeight: 600, color: "#2c7a7b" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={doctor.photo} alt={doctor.name} style={styles.photo} />

        <div style={styles.name}>{doctor.name}</div>

        <p style={styles.field}>
          <span style={styles.strong}>Specialization:</span> {doctor.specialization}
        </p>

        <p style={styles.field}>
          <span style={styles.strong}>Availability:</span> {doctor.availability}
        </p>

        <p style={styles.field}>
          <span style={styles.strong}>Email:</span> {doctor.email}
        </p>

        <p style={styles.field}>
          <span style={styles.strong}>Phone:</span> +91 {doctor.phone}
        </p>

        <p style={styles.field}>
          <span style={styles.strong}>Experience:</span> {doctor.experience} years
        </p>

        <p style={styles.field}>
          <span style={styles.strong}>Available Days:</span> {doctor.availableDays?.join(", ")}
        </p>

        {/* ----- NEW DROPDOWN CONSULT BUTTON ----- */}
        <div className="dropdown mt-3">
          <button
            className="btn btn-success dropdown-toggle rounded-pill px-4"
            type="button"
            data-bs-toggle="dropdown"
          >
            Consult Doctor
          </button>
          <ul className="dropdown-menu">
                <li>
            <button
                className="dropdown-item"
                onClick={() => navigate("/VideoCall")}
            >
                📹 Video Call
            </button>
            </li>
            <li>
            <button
                className="dropdown-item"
                onClick={() => navigate("/VoiceMessage")}
            >
                🎤 Voice Message
            </button>
            </li>
            <li>
            <button
                className="dropdown-item"
                onClick={() => navigate("/Chat")}
            >
                💬 Chat
            </button>
            </li>   
          </ul>
        </div>
        {/* --------------------------------------- */}

      </div>
    </div>
  );
}