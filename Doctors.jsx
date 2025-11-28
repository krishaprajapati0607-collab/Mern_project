import React, { useState, useEffect } from "react";
import AddDoctor from "./AddDoctor";
import UpdateDoctor from "./UpdateDoctor";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  // =========================
  // Fetch doctors from backend
  // =========================
  useEffect(() => {
    fetch("http://localhost:8000/api/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error("❌ Error fetching doctors:", err));
  }, []);

  // =========================
  // Add doctor to backend
  // =========================
  const handleAddDoctor = async (newDoctor) => {
    try {
      // Phone validation: only allow exactly 10 digits
      if (!/^\d{10}$/.test(newDoctor.phone)) {
        alert("Phone number must be exactly 10 digits");
        return;
      }

      const res = await fetch("http://localhost:8000/api/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDoctor),
      });
      const savedDoctor = await res.json();
      setDoctors([...doctors, savedDoctor]);
    } catch (err) {
      console.error("❌ Error adding doctor:", err);
    }
  };

  // =========================
  // Update doctor in backend
  // =========================
  const handleUpdateDoctor = async (updatedDoctor) => {
    try {
      // Phone validation: only allow exactly 10 digits
      if (!/^\d{10}$/.test(updatedDoctor.phone)) {
        alert("Phone number must be exactly 10 digits");
        return;
      }

      const res = await fetch(`http://localhost:8000/api/doctors/${updatedDoctor._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedDoctor),
      });
      const data = await res.json();
      setDoctors(doctors.map((doc) => (doc._id === data._id ? data : doc)));
    } catch (err) {
      console.error("❌ Error updating doctor:", err);
    }
  };

  // =========================
  // Delete doctor from backend
  // =========================
  const handleDeleteDoctor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    try {
      await fetch(`http://localhost:8000/api/doctors/${id}`, { method: "DELETE" });
      setDoctors(doctors.filter((doc) => doc._id !== id));
    } catch (err) {
      console.error("❌ Error deleting doctor:", err);
    }
  };

  // =========================
  // CSS styles
  // =========================
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e6f9f6, #cceef2)",
      fontFamily: "Segoe UI, Tahoma, sans-serif",
      padding: "2rem",
    },
    card: {
      background: "#fff",
      padding: "2rem 2.5rem",
      borderRadius: "18px",
      width: "95%",
      maxWidth: "1200px",
      boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.1)",
      animation: "fadeIn 0.6s ease-in-out",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem",
    },
    title: { color: "#2c7a7b", fontSize: "1.8rem", fontWeight: "600" },
    subtitle: { color: "#555", fontSize: "1rem", marginBottom: "1.5rem" },
    table: { width: "100%", borderCollapse: "collapse", marginBottom: "1.5rem", tableLayout: "fixed" },
    th: {
      border: "1px solid #d9e6e6",
      padding: "12px 15px",
      textAlign: "left",
      background: "#2c7a7b",
      color: "#fff",
      fontWeight: "600",
      fontSize: "0.95rem",
      wordWrap: "break-word",
    },
    td: {
      border: "1px solid #d9e6e6",
      padding: "12px 15px",
      fontSize: "0.95rem",
      color: "#333",
      wordWrap: "break-word",
      verticalAlign: "middle",
    },
    rowEven: { background: "#f8fdfd" },
    btn: {
      padding: "6px 12px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "0.85rem",
      fontWeight: "600",
      color: "#fff",
      marginRight: "6px",
    },
    addBtn: { background: "#2c7a7b" },
    updateBtn: { background: "#2563eb" },
    deleteBtn: { background: "#e63946" },
    img: { width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" },
  };

  // =========================
  // Render
  // =========================
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>🧑‍⚕️ Doctors Management</h1>
          <button style={{ ...styles.btn, ...styles.addBtn }} onClick={() => setShowAddForm(true)}>
            ➕ Add Doctor
          </button>
        </div>
        <p style={styles.subtitle}>Manage doctor profiles, schedules, and specializations.</p>

        {/* Add Doctor Form */}
        {showAddForm && <AddDoctor onAdd={handleAddDoctor} onClose={() => setShowAddForm(false)} />}

        {/* Update Doctor Form */}
        {editingDoctor && (
          <UpdateDoctor
            doctor={editingDoctor}
            onUpdate={handleUpdateDoctor}
            onClose={() => setEditingDoctor(null)}
          />
        )}

        {/* Doctors Table */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Photo</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Specialization</th>
              <th style={styles.th}>Availability</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Experience</th>
              <th style={styles.th}>Available Days</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc, index) => (
              <tr key={doc._id} style={index % 2 === 1 ? styles.rowEven : {}}>
                <td style={styles.td}>
                  {doc.photo ? <img src={doc.photo} alt={doc.name} style={styles.img} /> : "-"}
                </td>
                <td style={styles.td}>{doc.name}</td>
                <td style={styles.td}>{doc.specialization}</td>
                <td style={styles.td}>{doc.availability}</td>
                <td style={styles.td}>{doc.email || "-"}</td>
                
                {/* Add +91 before phone */}
                <td style={styles.td}>{doc.phone ? `+91 ${doc.phone}` : "-"}</td>
                <td style={styles.td}>{doc.experience || 0}</td>
                <td style={styles.td}>{doc.availableDays?.join(", ") || "-"}</td>
                <td style={styles.td}>
                  <button style={{ ...styles.btn, ...styles.updateBtn }} onClick={() => setEditingDoctor(doc)}>
                    ✏️ Update
                  </button>
                  <button style={{ ...styles.btn, ...styles.deleteBtn }} onClick={() => handleDeleteDoctor(doc._id)}>
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
