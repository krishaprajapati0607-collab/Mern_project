import React, { useState, useEffect } from "react";
import AddPatient from "./AddPatient";
import UpdatePatient from "./UpdatePatient";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  // Fetch patients from backend
  useEffect(() => {
    fetch("http://localhost:8000/api/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error("❌ Error fetching patients:", err));
  }, []);

  // Add patient to backend
  const handleAddPatient = async (newPatient) => {
    try {
      const res = await fetch("http://localhost:8000/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPatient),
      });
      const savedPatient = await res.json();
      setPatients([...patients, savedPatient]);
    } catch (err) {
      console.error("❌ Error adding patient:", err);
    }
  };

  // Update patient in backend
  const handleUpdatePatient = async (updatedPatient) => {
    try {
      const res = await fetch(`http://localhost:8000/api/patients/${updatedPatient._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPatient),
      });
      const data = await res.json();
      setPatients(patients.map((p) => (p._id === data._id ? data : p)));
    } catch (err) {
      console.error("❌ Error updating patient:", err);
    }
  };

  // Delete patient from backend
  const handleDeletePatient = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/patients/${id}`, { method: "DELETE" });
      setPatients(patients.filter((p) => p._id !== id));
    } catch (err) {
      console.error("❌ Error deleting patient:", err);
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f2fdfd, #d6f6f6)",
      fontFamily: "Segoe UI, Tahoma, sans-serif",
      padding: "2rem",
    },
    card: {
      background: "#fff",
      padding: "2rem 2.5rem",
      borderRadius: "18px",
      width: "90%",
      maxWidth: "950px",
      boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.1)",
      animation: "fadeIn 0.6s ease-in-out",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem",
    },
    title: {
      color: "#2c7a7b",
      fontSize: "1.8rem",
      fontWeight: "600",
    },
    subtitle: {
      color: "#555",
      fontSize: "1rem",
      marginBottom: "1.5rem",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "1.5rem",
    },
    th: {
      border: "1px solid #d9e6e6",
      padding: "12px 15px",
      textAlign: "left",
      background: "#2c7a7b",
      color: "#fff",
      fontWeight: "600",
      fontSize: "0.95rem",
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
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>👩‍🦽 Patients Management</h1>
          {/* <button style={{ ...styles.btn, ...styles.addBtn }} onClick={() => setShowAddForm(true)}>
            ➕ Add Patient
          </button> */}
        </div>
        <p style={styles.subtitle}>View patient details, history, and records.</p>

        {showAddForm && <AddPatient onAdd={handleAddPatient} onClose={() => setShowAddForm(false)} />}
        {editingPatient && (
          <UpdatePatient
            patient={editingPatient}
            onUpdate={handleUpdatePatient}
            onClose={() => setEditingPatient(null)}
          />
        )}

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Patient Name</th>
              <th style={styles.th}>Age</th>
              <th style={styles.th}>Medical History</th>
              {/* <th style={styles.th}>Disease</th>
              <th style={styles.th}>Admission Date</th> */}
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p, index) => (
              <tr key={p._id} style={index % 2 === 1 ? styles.rowEven : {}}>
                <td style={styles.td}>{p.name}</td>
                <td style={styles.td}>{p.age}</td>
                <td style={styles.td}>{p.medicalHistory || "-"}</td>
                {/* <td style={styles.td}>{p.disease}</td>
                <td style={styles.td}>{p.admission}</td> */}
                <td style={styles.td}>
                  <button style={{ ...styles.btn, ...styles.updateBtn }} onClick={() => setEditingPatient(p)}>
                    ✏️ Update
                  </button>
                  <button style={{ ...styles.btn, ...styles.deleteBtn }} onClick={() => handleDeletePatient(p._id)}>
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
