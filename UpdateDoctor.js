import React, { useState, useEffect } from "react";

// Component to update an existing doctor's details
export default function UpdateDoctor({ doctor, onUpdate, onClose }) {
  // formData holds all the fields of the doctor to be updated
  const [formData, setFormData] = useState(doctor);

  // preview holds the photo to show a preview when user selects a new image
  const [preview, setPreview] = useState(doctor.photo || null);

  // useEffect runs when the 'doctor' prop changes, to reset formData and preview
  useEffect(() => {
    setFormData(doctor);
    setPreview(doctor.photo || null);
  }, [doctor]);

  // handleChange updates formData when user types in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "availableDays") {
      // Split comma-separated availableDays into an array
      setFormData({ ...formData, [name]: value.split(",").map((day) => day.trim()) });
    } else if (name === "experience") {
      // Convert experience input to number
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      // For all other fields
      setFormData({ ...formData, [name]: value });
    }
  };

  // handleFileChange reads the selected image file and stores it as Base64 in formData
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      // Save Base64 image string in formData.photo
      setFormData({ ...formData, photo: reader.result });
      // Set preview for display
      setPreview(reader.result);
    };
    reader.readAsDataURL(file); // Convert file to Base64
  };

  // handleSubmit validates required fields and sends updated data to parent
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation for required fields
    if (!formData.name || !formData.specialization || !formData.availability) {
      alert("⚠️ Please fill all required fields!");
      return;
    }

    // Pass updated data to parent component
    onUpdate(formData);
    // Close the update form
    onClose();
  };

  // Inline CSS styles
  const styles = {
    form: {
      background: "#f8fdfd",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
      marginBottom: "1.5rem",
    },
    inputGroup: { marginBottom: "1rem" }, // spacing between inputs
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
      background: "#2563eb",
      transition: "all 0.3s ease",
    },
    imgPreview: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      objectFit: "cover",
      marginTop: "6px",
    }, // style for the previewed image
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h2 style={{ color: "#2563eb", marginBottom: "1rem" }}>✏️ Update Doctor</h2>

      {/* Input fields */}
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
        <input type="email" name="email" value={formData.email || ""} onChange={handleChange} style={styles.input} />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Phone</label>
        <input type="text" name="phone" value={formData.phone || ""} onChange={handleChange} style={styles.input} />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Experience (years)</label>
        <input type="number" name="experience" value={formData.experience || 0} onChange={handleChange} style={styles.input} />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Available Days (comma separated)</label>
        <input type="text" name="availableDays" value={formData.availableDays?.join(", ") || ""} onChange={handleChange} style={styles.input} />
      </div>

      {/* Photo upload */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>Photo</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && <img src={preview} alt="Preview" style={styles.imgPreview} />}
      </div>

      {/* Submit button */}
      <button type="submit" style={styles.btn}>✏️ Update Doctor</button>
    </form>
  );
}
