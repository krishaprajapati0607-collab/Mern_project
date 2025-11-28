import React, { useState } from "react";

export default function UpdateMedicine({ medicine, onUpdate, onClose }) {
  const [form, setForm] = useState({
    name: medicine.name || "",
    manufacturer: medicine.manufacturer || "",
    price: medicine.price || 0,
    stock: medicine.stock || 0,
    expiryDate: medicine.expiryDate ? medicine.expiryDate.slice(0, 10) : "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8000/api/medicines/${medicine._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock) }),
      });
      const updatedMedicine = await res.json();
      onUpdate(updatedMedicine);
      onClose();
    } catch (err) {
      console.error("❌ Error updating medicine:", err);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Update Medicine</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input name="name" placeholder="Medicine Name" value={form.name} onChange={handleChange} required />
          <input name="manufacturer" placeholder="Manufacturer" value={form.manufacturer} onChange={handleChange} />
          <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
          <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} />
          <input name="expiryDate" type="date" value={form.expiryDate} onChange={handleChange} />
          <div style={styles.btnGroup}>
            <button type="submit" style={styles.updateBtn}>✏️ Update</button>
            <button type="button" style={styles.cancelBtn} onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.3)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
  modal: { background: "#fff", padding: "2rem", borderRadius: "14px", width: "350px", boxShadow: "0 8px 18px rgba(0,0,0,0.2)" },
  form: { display: "flex", flexDirection: "column", gap: "0.75rem" },
  btnGroup: { display: "flex", justifyContent: "space-between", marginTop: "1rem" },
  updateBtn: { background: "#f59e0b", color: "#fff", padding: "8px 14px", border: "none", borderRadius: "8px", cursor: "pointer" },
  cancelBtn: { background: "#dc2626", color: "#fff", padding: "8px 14px", border: "none", borderRadius: "8px", cursor: "pointer" },
};
