import React, { useState, useEffect } from "react";
import AddMedicine from "./AddMedicine";
import UpdateMedicine from "./UpdateMedicine";

export default function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  // Fetch all medicines
  const fetchMedicines = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/medicines");
      const data = await res.json();
      setMedicines(data);
    } catch (err) {
      console.error("❌ Error fetching medicines:", err);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // Delete medicine
  const deleteMedicine = async (medicine) => {
    if (!window.confirm(`Are you sure you want to delete ${medicine.name}?`)) return;
    try {
      await fetch(`http://localhost:8000/api/medicines/${medicine._id}`, { method: "DELETE" });
      setMedicines(medicines.filter((m) => m._id !== medicine._id));
    } catch (err) {
      console.error("❌ Error deleting medicine:", err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>💊 Medicines Management</h1>
        <p style={styles.subtitle}>Track and manage medicine stock and prescriptions efficiently.</p>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Medicine</th>
              <th style={styles.th}>Quantity</th>
              <th style={styles.th}>Price (₹)</th>
              <th style={styles.th}>Expiry Date</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((m, index) => (
              <tr key={m._id} style={index % 2 === 1 ? styles.rowEven : {}}>
                <td style={styles.td}>{m.name}</td>
                <td style={styles.td}>{m.stock}</td>
                <td style={styles.td}>
                  {m.price ? `₹ ${parseFloat(m.price).toFixed(2)}` : "-"}
                </td>
                <td style={styles.td}>
                  {m.expiryDate ? new Date(m.expiryDate).toLocaleDateString() : "-"}
                </td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.status,
                      ...(m.stock > 50 ? styles.available : m.stock > 0 ? styles.low : styles.out),
                    }}
                  >
                    {m.stock > 50 ? "Available" : m.stock > 0 ? "Low Stock" : "Out of Stock"}
                  </span>
                </td>
                <td style={styles.td}>
                  <button
                    style={{ ...styles.actionBtn, ...styles.updateBtn }}
                    onClick={() => {
                      setSelectedMedicine(m);
                      setShowUpdateForm(true);
                    }}
                  >
                    ✏️ Update
                  </button>
                  <button
                    style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                    onClick={() => deleteMedicine(m)}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ textAlign: "center" }}>
          <button style={styles.addBtn} onClick={() => setShowAddForm(true)}>
            ➕ Add Medicine
          </button>
        </div>

        {showAddForm && (
          <AddMedicine
            onClose={() => setShowAddForm(false)}
            onAdd={(newMed) => setMedicines([...medicines, newMed])}
          />
        )}

        {showUpdateForm && selectedMedicine && (
          <UpdateMedicine
            medicine={selectedMedicine}
            onClose={() => setShowUpdateForm(false)}
            onUpdated={(updatedMed) =>
              setMedicines(medicines.map((m) => (m._id === updatedMed._id ? updatedMed : m)))
            }
          />
        )}
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", background: "linear-gradient(135deg, #f6fff9, #d9f7e6)", fontFamily: "Segoe UI, Tahoma, sans-serif", padding: "2rem" },
  card: { background: "#ffffff", padding: "2rem 2.5rem", borderRadius: "18px", width: "90%", maxWidth: "950px", boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.1)", animation: "fadeIn 0.6s ease-in-out" },
  title: { color: "#059669", marginBottom: "0.5rem", fontSize: "1.9rem", fontWeight: "600", textAlign: "center" },
  subtitle: { color: "#444", fontSize: "1rem", marginBottom: "1.5rem", textAlign: "center" },
  table: { width: "100%", borderCollapse: "collapse", marginBottom: "1.5rem" },
  th: { border: "1px solid #e0f2e9", padding: "12px 15px", textAlign: "left", background: "#059669", color: "#fff", fontWeight: "600", fontSize: "0.95rem" },
  td: { border: "1px solid #e0f2e9", padding: "12px 15px", textAlign: "left", fontSize: "0.95rem", color: "#333" },
  rowEven: { background: "#f2fdf7" },
  status: { padding: "6px 12px", borderRadius: "8px", fontSize: "0.85rem", fontWeight: "600", color: "#fff" },
  available: { background: "#16a34a" },
  low: { background: "#f59e0b" },
  out: { background: "#dc2626" },
  actionBtn: { padding: "6px 10px", marginRight: "6px", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem", fontWeight: "600", color: "#fff" },
  updateBtn: { background: "#f59e0b" },
  deleteBtn: { background: "#dc2626" },
  addBtn: { background: "#059669", color: "#fff", padding: "10px 18px", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "0.95rem", fontWeight: "600", transition: "all 0.3s ease" },
};
