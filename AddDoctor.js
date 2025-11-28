import React, { useState } from "react";

// Component to add a new doctor
export default function AddDoctor({ onAdd, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    availability: "",
    email: "",
    phone: "", // Store only 10-digit number, prefix +91 added in display
    experience: 0,
    availableDays: [],
    photo: "",
  });

  const [preview, setPreview] = useState(null);

  // Update form data when inputs change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "availableDays") {
      setFormData({ ...formData, [name]: value.split(",").map((day) => day.trim()) });
    } else if (name === "experience") {
      setFormData({ ...formData, [name]: Number(value) });
    } else if (name === "phone") {
      // Remove any non-digit characters
      const digits = value.replace(/\D/g, "");
      // Limit to max 10 digits
      if (digits.length <= 10) {
        setFormData({ ...formData, phone: digits });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle photo upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, photoFile: file }); // store file object
    setPreview(URL.createObjectURL(file)); // preview only

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, photo: reader.result });
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Required fields validation
    if (!formData.name || !formData.specialization || !formData.availability) {
      alert("⚠️ Please fill all required fields!");
      return;
    }

    // Phone validation: must be exactly 10 digits
    if (formData.phone.length !== 10) {
      alert("⚠️ Phone number must be exactly 10 digits!");
      return;
    }

    // Call parent onAdd with form data
    onAdd(formData);
    onClose();
  };

  const styles = {
    form: {
      background: "#f8fdfd",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
      marginBottom: "1.5rem",
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
    btn: {
      padding: "10px 18px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "0.95rem",
      fontWeight: "600",
      color: "#fff",
      background: "#2c7a7b",
      transition: "all 0.3s ease",
    },
    imgPreview: { width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover", marginTop: "6px" },
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h2 style={{ color: "#2c7a7b", marginBottom: "1rem" }}>➕ Add Doctor</h2>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Doctor Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} style={styles.input} />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Specialization</label>
        <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} style={styles.input} />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Availability</label>
        <input type="text" name="availability" value={formData.availability} onChange={handleChange} style={styles.input} />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Phone (+91 fixed)</label>
        <input
          type="text"
          name="phone"
          value={formData.phone ? ` ${formData.phone}` : ""}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Experience (years)</label>
        <input type="number" name="experience" value={formData.experience} onChange={handleChange} style={styles.input} />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Available Days (comma separated)</label>
        <input type="text" name="availableDays" value={formData.availableDays.join(", ")} onChange={handleChange} style={styles.input} />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Photo</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && <img src={preview} alt="Preview" style={styles.imgPreview} />}
      </div>

      <button type="submit" style={styles.btn}>➕ Add Doctor</button>
    </form>
  );
}
