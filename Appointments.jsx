import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/appointments");
        setAppointments(res.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        alert("Failed to fetch appointments");
      }
    };
    fetchAppointments();
  }, []);

  // Update status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:8000/api/appointments/${id}`, { status });
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status } : a))
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    }
  };

  // Delete appointment
  const deleteAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/appointments/${id}`);
      setAppointments((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Error deleting appointment:", err);
      alert("Failed to delete appointment");
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
    statusSelect: {
      padding: "6px",
      borderRadius: "6px",
      border: "1px solid #d9e6e6",
      fontWeight: "600",
      cursor: "pointer",
    },
    deleteBtn: { background: "#e63946" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>📅 Appointments Management</h1>
        </div>
        <p style={styles.subtitle}>View and manage all appointments.</p>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Patient Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Update Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, index) => (
              <tr key={a._id} style={index % 2 === 1 ? styles.rowEven : {}}>
                <td style={styles.td}>{a.patientName}</td>
                <td style={styles.td}>{a.email}</td>
                <td style={styles.td}>{new Date(a.date).toLocaleString()}</td>
                <td
                  style={{
                    ...styles.td,
                    fontWeight: "600",
                    color:
                      a.status === "Confirmed"
                        ? "green"
                        : a.status === "Pending"
                        ? "orange"
                        : "red",
                  }}
                >
                  {a.status}
                </td>
                <td style={styles.td}>
                  <select
                    style={styles.statusSelect}
                    value={a.status}
                    onChange={(e) => updateStatus(a._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Approved</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td style={styles.td}>
                  <button
                    onClick={() => deleteAppointment(a._id)}
                    style={{ ...styles.btn, ...styles.deleteBtn }}
                  >
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
