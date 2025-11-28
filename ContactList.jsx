import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/contacts");
      setContacts(res.data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/contacts/${id}`);
      fetchContacts();
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Inbuilt styles
  const containerStyle = {
    maxWidth: "900px",
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

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    textAlign: "left",
  };

  const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  };

  const buttonStyle = {
    padding: "5px 10px",
    marginLeft: "5px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#2196F3",
    color: "white",
    textDecoration: "none",
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f44336",
    color: "white",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>All Contacts</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Message</th>
            <th style={thStyle}>Created At</th>
            <th style={thStyle}>Updated At</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td style={tdStyle}>{contact.name}</td>
              <td style={tdStyle}>{contact.email}</td>
              <td style={tdStyle}>{contact.message}</td>
              <td style={tdStyle}>
                {new Date(contact.createdAt).toLocaleString()}
              </td>
              <td style={tdStyle}>
                {new Date(contact.updatedAt).toLocaleString()}
              </td>
              <td style={tdStyle}>
                <Link
                  to={`/contactedit/${contact._id}`}
                  style={editButtonStyle}
                >
                  Edit
                </Link>
                <button
                  style={deleteButtonStyle}
                  onClick={() => handleDelete(contact._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
