// src/components/PatientDetails.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PatientDetails() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/patients");
      setPatients(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching patients");
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/patients/${id}`);
      fetchPatients();
    } catch (err) {
      console.error(err);
      alert("Error deleting patient");
    }
  };

  return (
    <div className="container mt-5">
        {/* Back arrow */}
      <button
        className="btn btn-outline-primary mb-3"
        onClick={() => navigate(-1)} // Go back to previous page
        style={{ fontSize: "18px" }}>
        ← Back
      </button>
      <h2>Patient Details</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Medical History</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.gender}</td>
              <td>{p.phone}</td>
              <td>{p.address}</td>
              <td>{p.medicalHistory.join(", ")}</td>
              <td>
                    <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => navigate(`/apatients/update/${p._id}`)} // ✅ updated route
                    >
                        Update
                    </button>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(p._id)}
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
