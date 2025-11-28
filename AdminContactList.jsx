// frontend/src/components/AdminContactList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminContactList() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/contacts");
      setContacts(res.data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // styling
  const container = {
    maxWidth: "900px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  };

  const table = { width: "100%", borderCollapse: "collapse" };
  const th = { backgroundColor: "#4CAF50", color: "white", padding: "10px", textAlign: "left" };
  const td = { padding: "10px", borderBottom: "1px solid #ddd" };

  return (
    <div style={container}>
      <h2>All Contact Messages (Admin View)</h2>
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Name</th>
            <th style={th}>Email</th>
            <th style={th}>Message</th>
            <th style={th}>Received At</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c._id}>
              <td style={td}>{c.name}</td>
              <td style={td}>{c.email}</td>
              <td style={td}>{c.message}</td>
              <td style={td}>{new Date(c.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}