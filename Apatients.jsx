import React, { useState } from "react";

export default function Patients() {
  const [patients, setPatients] = useState([
    { id: 1, name: "Amit Sharma", age: 45, disease: "Diabetes", admission: "02 Jan 2025" },
    { id: 2, name: "Priya Verma", age: 30, disease: "Asthma", admission: "15 Feb 2025" },
    { id: 3, name: "Rahul Gupta", age: 60, disease: "Heart Disease", admission: "28 Mar 2025" },
  ]);

  const addPatient = () => alert("➕ Add Patient clicked!");
  const updatePatient = () => alert("✏️ Update Patient clicked!");
  const deletePatient = () => alert("🗑 Delete Patient clicked!");

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
      maxWidth: "900px",
      boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.1)",
      animation: "fadeIn 0.6s ease-in-out",
    },
    title: {
      color: "#2c7a7b",
      marginBottom: "0.5rem",
      fontSize: "1.8rem",
      fontWeight: "600",
      textAlign: "center",
    },
    subtitle: {
      color: "#555",
      fontSize: "1rem",
      marginBottom: "1.5rem",
      textAlign: "center",
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
      textAlign: "left",
      fontSize: "0.95rem",
      color: "#333",
    },
    rowEven: {
      background: "#f8fdfd",
    },
    btnGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "12px",
      marginTop: "20px",
    },
    btn: {
      padding: "10px 18px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "0.95rem",
      fontWeight: "600",
      color: "#fff",
      transition: "all 0.3s ease",
    },
    addBtn: { background: "#2c7a7b" },
    updateBtn: { background: "#2563eb" },
    deleteBtn: { background: "#e63946" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>👩‍🦽 Patients Management</h1>
        <p style={styles.subtitle}>View patient details, history, and records.</p>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Patient Name</th>
              <th style={styles.th}>Age</th>
              <th style={styles.th}>Disease</th>
              <th style={styles.th}>Admission Date</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p, index) => (
              <tr key={p.id} style={index % 2 === 1 ? styles.rowEven : {}}>
                <td style={styles.td}>{p.name}</td>
                <td style={styles.td}>{p.age}</td>
                <td style={styles.td}>{p.disease}</td>
                <td style={styles.td}>{p.admission}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Action Buttons */}
        <div style={styles.btnGroup}>
          <button style={{ ...styles.btn, ...styles.addBtn }} onClick={addPatient}>
            ➕ Add Patient
          </button>
          <button style={{ ...styles.btn, ...styles.updateBtn }} onClick={updatePatient}>
            ✏️ Update Patient
          </button>
          <button style={{ ...styles.btn, ...styles.deleteBtn }} onClick={deletePatient}>
            🗑 Delete Patient
          </button>
        </div>
      </div>
    </div>
  );
}
