// frontend/src/components/FeedbackList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/feedbacks");
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this feedback?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/feedbacks/${id}`);
      fetchFeedbacks();
    } catch (err) {
      console.error("Error deleting feedback:", err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
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
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f44336",
    color: "white",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>All Feedbacks</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Rating</th>
            <th style={thStyle}>Created At</th>
            <th style={thStyle}>Updated At</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((fb) => (
            <tr key={fb._id}>
              <td style={tdStyle}>{fb.name}</td>
              <td style={tdStyle}>{fb.email}</td>
              <td style={tdStyle}>{fb.rating}</td>
              <td style={tdStyle}>{new Date(fb.createdAt).toLocaleString()}</td>
              <td style={tdStyle}>{new Date(fb.updatedAt).toLocaleString()}</td>
              <td style={tdStyle}>
                <Link to={`/feedbackedit/${fb._id}`} style={editButtonStyle}>
                  Edit
                </Link>
                <button
                  style={deleteButtonStyle}
                  onClick={() => handleDelete(fb._id)}
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