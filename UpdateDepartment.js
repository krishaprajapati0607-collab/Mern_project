import React, { useState, useEffect } from "react";

export default function UpdateDepartment({ department, onUpdate, onClose }) {
  const [formData, setFormData] = useState(department);
  const [preview, setPreview] = useState(null);

  useEffect(() => setFormData(department), [department]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return alert("⚠️ Department name required");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    if (formData.image instanceof File) data.append("image", formData.image);

    const res = await fetch(`http://localhost:8000/api/departments/${formData._id}`, {
      method: "PUT",
      body: data,
    });
    const updatedDept = await res.json();
    onUpdate(updatedDept);
    onClose();
  };

  const styles = {
    form: { background: "#f9fbff", padding: "1.5rem", borderRadius: "14px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", marginBottom: "1.5rem" },
    inputGroup: { marginBottom: "1rem" },
    label: { display: "block", marginBottom: "6px", fontWeight: "600", color: "#2563eb" },
    input: { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #d9e6e6" },
    btn: { padding: "10px 18px", border: "none", borderRadius: "8px", cursor: "pointer", background: "#f59e0b", color: "#fff", fontWeight: 600 },
    imgPreview: { width: "180px", height: "140px", objectFit: "contain", borderRadius: "6px", marginTop: "10px", border: "2px solid #e5e7eb", backgroundColor: "#f9fbff" },
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h2 style={{ color: "#2563eb", marginBottom: "1rem" }}>✏️ Update Department</h2>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Department Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} style={styles.input} required />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} style={styles.input} rows={3} />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Photo</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview ? (
          <img src={preview} alt="Preview" style={styles.imgPreview} />
        ) : formData.image ? (
          <img src={`http://localhost:8000/uploads/${formData.image}`} alt="Current" style={styles.imgPreview} />
        ) : null}
      </div>

      <button type="submit" style={styles.btn}>Update Department</button>
    </form>
  );
}
