import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserAppointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem("currentUser")) || {};

  // Redirect if not logged in
  useEffect(() => {
    if (!user?.email) {
      alert("Please log in to view your appointments.");
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch user's appointments
 useEffect(() => {
  const fetchAppointments = async () => {
    try {
      if (!user?._id) return; // Ensure we have user ID
      const res = await axios.get(`http://localhost:8000/api/appointments/user/${user._id}`);
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      alert("Failed to fetch appointments");
    }
  };
  fetchAppointments();
}, [user]);


  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        fontFamily: "Segoe UI, Tahoma, sans-serif",
      }}
    >
      <h2>My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr style={{ background: "#2c7a7b", color: "#fff" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Doctor Name</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Date</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Status</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{a.doctorName}</td>
                <td style={{ padding: "10px" }}>{new Date(a.date).toLocaleString()}</td>
                <td
                  style={{
                    padding: "10px",
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
                <td style={{ padding: "10px" }}>{a.notes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
