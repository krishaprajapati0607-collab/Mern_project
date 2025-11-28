// frontend/src/pages/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "Patient",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/users/register", formData);
      alert("Registration Successful!");
      console.log("New User:", res.data);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          {/* <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="Patient">Patient</option>
            <option value="Admin">Admin</option>
          </select> */}
          <button type="submit" style={styles.button}>Register</button>
        </form>
        <p style={styles.switch}>
          Already have an account?{" "}
          <a href="/login" style={styles.link}>Login</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f4f6f9" },
  card: { width: "350px", padding: "30px", borderRadius: "12px", background: "#fff", boxShadow: "0 6px 15px rgba(0,0,0,0.1)", textAlign: "center" },
  title: { marginBottom: "20px", color: "#333" },
  form: { display: "flex", flexDirection: "column" },
  input: { margin: "10px 0", padding: "12px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "14px" },
  button: { marginTop: "15px", padding: "12px", border: "none", borderRadius: "8px", background: "#2196F3", color: "#fff", fontSize: "16px", cursor: "pointer" },
  switch: { marginTop: "15px", fontSize: "14px", color: "#555" },
  link: { color: "#2196F3", textDecoration: "none", fontWeight: "bold" }
};
