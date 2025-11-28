import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdatePatient() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/patients/${id}`);
        const p = res.data;
        setName(p.name);
        setAge(p.age);
        setGender(p.gender);
        setPhone(p.phone || "");
        setAddress(p.address || "");
        setMedicalHistory(p.medicalHistory ? p.medicalHistory.join(", ") : "");
      } catch (err) {
        console.error(err);
        alert("Error fetching patient details");
      }
    };
    fetchPatient();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !age) {
      alert("Please enter patient name and age.");
      return;
    }

    try {
      const data = {
        name,
        age: Number(age),
        gender,
        phone,
        address,
        medicalHistory: medicalHistory
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),
      };

      await axios.put(`http://localhost:8000/api/patients/${id}`, data);
      alert("Patient updated successfully!");
      navigate("/patientdetails");
    } catch (err) {
      console.error(err);
      alert("Error updating patient");
    }
  };

  return (
    <div className="container mt-5">

      {/* Back arrow */}
      <button
        className="btn btn-outline-primary mb-3"
        onClick={() => navigate(-1)} // Go back to previous page
        style={{ fontSize: "18px" }}
      >
        ← Back
      </button>

      
      <h2>Update Patient</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Gender</label>
          <select
            className="form-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Medical History (comma separated)</label>
          <input
            type="text"
            className="form-control"
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Patient
        </button>
      </form>
    </div>
  );
}
