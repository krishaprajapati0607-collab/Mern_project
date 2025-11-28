import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddMedicine({ onAdd, onClose }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    manufacturer: "",
    price: "",
    stock: "",
    expiryDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/medicines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        }),
      });

      const newMedicine = await res.json();
      onAdd(newMedicine);     // update parent state
      navigate("/medicines"); // redirect to Medicines page
      onClose();              // close modal
    } catch (err) {
      console.error("❌ Error adding medicine:", err);
    }
  };

  const styles = {
    form: {
      background: "#f8fdfd",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
      marginBottom: "1.5rem",
      width: "100%",
      maxWidth: "400px",
    },
    inputGroup: { marginBottom: "1rem" },
    label: { display: "block", marginBottom: "6px", fontWeight: "600", color: "#2c7a7b" },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #d9e6e6",
      fontSize: "0.95rem",
    },
    btnGroup: { display: "flex", justifyContent: "space-between", marginTop: "1rem" },
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
    addBtn: { background: "#059669" },
    cancelBtn: { background: "#dc2626" },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.3)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modal: {
      background: "#fff",
      padding: "2rem",
      borderRadius: "14px",
      width: "100%",
      maxWidth: "450px",
      boxShadow: "0 8px 18px rgba(0,0,0,0.2)",
      animation: "fadeIn 0.4s ease-in-out",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={{ color: "#2c7a7b", marginBottom: "1rem" }}>➕ Add Medicine</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Medicine Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter medicine name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Manufacturer</label>
            <input
              type="text"
              name="manufacturer"
              placeholder="Enter manufacturer name"
              value={form.manufacturer}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Price</label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={form.price}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Stock</label>
            <input
              type="number"
              name="stock"
              placeholder="Enter stock quantity"
              value={form.stock}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              placeholder="Select expiry date"
              value={form.expiryDate}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.btnGroup}>
            <button type="submit" style={{ ...styles.btn, ...styles.addBtn }}>➕ Add</button>
            <button type="button" style={{ ...styles.btn, ...styles.cancelBtn }} onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
