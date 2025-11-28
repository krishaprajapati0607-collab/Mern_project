import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


export default function Login({ setCurrentUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:8000/api/users/login", formData, { withCredentials: true });
      setCurrentUser(res.data.user);

      if (res.data.user.role === "Admin") navigate("/admin");
      else navigate("/main");
    } catch (err) {
  // Log full error for debugging
  console.log("Axios error:", err);

  // Log response if available
  if (err.response) {
    console.log("Server responded with:", err.response.data);
    console.log("Status code:", err.response.status);
    console.log("Headers:", err.response.headers);
    setError(err.response.data.error || "Something went wrong");
  } else if (err.request) {
    console.log("No response received:", err.request);
    setError("No response from server. Is backend running?");
  } else {
    console.log("Error setting up request:", err.message);
    setError(err.message);
  }
}

  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={styles.input} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={styles.input} />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        <p style={styles.switch}>Don’t have an account? <a href="/register" style={styles.link}>Register</a></p>
        {/* Forgot Password Link */}
      <p style={{ textAlign: "center", marginTop: "15px" }}>
        <Link to="/forgot-password" style={{ color: "#4CAF50", textDecoration: "none" }}>
          Forgot Password?
        </Link>
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
  button: { marginTop: "15px", padding: "12px", border: "none", borderRadius: "8px", background: "#4CAF50", color: "#fff", fontSize: "16px", cursor: "pointer" },
  switch: { marginTop: "15px", fontSize: "14px", color: "#555" },
  link: { color: "#4CAF50", textDecoration: "none", fontWeight: "bold" }
};
