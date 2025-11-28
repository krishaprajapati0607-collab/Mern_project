import { useState, useEffect } from "react";
import AddDepartment from "./AddDepartment";
import UpdateDepartment from "./UpdateDepartment";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDept, setEditingDept] = useState(null);

  // Fetch all departments from backend
  useEffect(() => {
    fetch("http://localhost:8000/api/departments")
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error("❌ Error fetching departments:", err));
  }, []);

  // Add department
  const handleAddDepartment = (newDept) => {
    setDepartments([...departments, newDept]);
  };

  // Update department
  const handleUpdateDepartment = (updatedDept) => {
    setDepartments(departments.map((dept) => (dept._id === updatedDept._id ? updatedDept : dept)));
  };

  // Delete department
  const handleDeleteDepartment = async (deptId) => {
    try {
      await fetch(`http://localhost:8000/api/departments/${deptId}`, { method: "DELETE" });
      setDepartments(departments.filter((dept) => dept._id !== deptId));
    } catch (err) {
      console.error("❌ Error deleting department:", err);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.pageCard}>
        <h1 style={styles.title}>🏥 Hospital Departments</h1>
        <p style={styles.subtitle}>Explore various departments and their facilities.</p>

        {/* Add Department Button */}
        <div style={styles.btnGroup}>
          <button style={{ ...styles.btn, ...styles.addBtn }} onClick={() => setShowAddForm(true)}>
            ➕ Add Department
          </button>
        </div>

        {/* Add / Update forms */}
        {showAddForm && <AddDepartment onAdd={handleAddDepartment} onClose={() => setShowAddForm(false)} />}
        {editingDept && (
          <UpdateDepartment department={editingDept} onUpdate={handleUpdateDepartment} onClose={() => setEditingDept(null)} />
        )}

        {/* Department cards */}
        <div style={styles.grid}>
          {departments.map((dept) => (
            <div key={dept._id} style={styles.card}>
              {dept.image && (
                <img
                  src={`http://localhost:8000/uploads/${dept.image}`}
                  alt={dept.name}
                  style={styles.logoImage} // ✅ now square
                />
              )}


              <h2 style={styles.cardTitle}>{dept.name}</h2>
              <p style={styles.cardDesc}>{dept.description || "-"}</p>

              {/* Action buttons per card */}
              <div style={styles.cardBtnGroup}>
                <button style={{ ...styles.btn, ...styles.updateBtn }} onClick={() => setEditingDept(dept)}>
                  ✏️ Update
                </button>
                <button style={{ ...styles.btn, ...styles.deleteBtn }} onClick={() => handleDeleteDepartment(dept._id)}>
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
const styles = {
  pageContainer: { display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", background: "linear-gradient(135deg, #f8fbff, #e6f0fa)", fontFamily: '"Segoe UI", Tahoma, sans-serif', padding: "2rem" },
  pageCard: { background: "#ffffff", padding: "2rem 2.5rem", borderRadius: "18px", width: "95%", maxWidth: "1100px", boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.1)", animation: "fadeIn 0.6s ease-in-out" },
  title: { color: "#2563eb", marginBottom: "0.5rem", fontSize: "2rem", fontWeight: "600", textAlign: "center" },
  subtitle: { color: "#555", fontSize: "1rem", marginBottom: "2rem", textAlign: "center" },
  grid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }, // 2 cards per row
  card: { background: "#f9fbff", padding: "1.5rem", borderRadius: "14px", textAlign: "center", cursor: "pointer", transition: "all 0.3s ease" },
  cardImage: { width: "100%", height: "150px", objectFit: "cover", borderRadius: "12px", marginBottom: "10px" },
  logoImage: { width: "200px", height: "160px", objectFit: "contain", marginBottom: "12px", border: "2px solid #e5e7eb", borderRadius: "6px" },
  cardTitle: { fontSize: "1.3rem", color: "#1e3a8a", marginBottom: "0.5rem" },
  cardDesc: { fontSize: "0.95rem", color: "#444", marginBottom: "1rem", textAlign: "justify" }, // ✅ description justified
  btnGroup: { marginBottom: "1.5rem", display: "flex", justifyContent: "center", gap: "0.75rem" },
  cardBtnGroup: { display: "flex", justifyContent: "center", gap: "0.5rem" },
  btn: { padding: "8px 12px", border: "none", borderRadius: "8px", fontSize: "0.85rem", fontWeight: "500", cursor: "pointer", transition: "all 0.3s ease" },
  addBtn: { background: "#2563eb", color: "#fff" },
  updateBtn: { background: "#f59e0b", color: "#fff" },
  deleteBtn: { background: "#dc2626", color: "#fff" },
};





