import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("❌ Error fetching users:", err);
      alert("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user with admin confirmation
  const deleteUser = async (user) => {
    const confirmDelete = window.confirm(
      `⚠️ Admin wants to delete the profile of ${user.username}.\nThis action cannot be undone.`
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/api/users/${user._id}`);
      setUsers(users.filter((u) => u._id !== user._id));
      alert(`${user.username} has been deleted.`);

      // Optional: send notification/email to the user
      // await axios.post(`http://localhost:8000/api/notify-delete`, { userId: user._id });

    } catch (err) {
      console.error("❌ Error deleting user:", err);
      alert("Failed to delete user");
    }
  };

  const styles = {
    container: {
      maxWidth: "1000px",
      margin: "40px auto",
      fontFamily: "Segoe UI, Tahoma, sans-serif",
    },
    title: {
      textAlign: "center",
      color: "#2563eb",
      marginBottom: "20px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    th: {
      padding: "12px",
      border: "1px solid #ddd",
      background: "#2563eb",
      color: "#fff",
      fontWeight: "600",
      textAlign: "left",
    },
    td: {
      padding: "12px",
      border: "1px solid #ddd",
      fontSize: "0.95rem",
      color: "#333",
    },
    deleteBtn: {
      padding: "6px 12px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      background: "#dc2626",
      color: "#fff",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👥 Users Management</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Last Updated Login Date & Time</th>

            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td style={styles.td}>{u.username}</td>
              <td style={styles.td}>{u.email}</td>
              <td style={styles.td}>{u.role}</td>
              <td style={styles.td}>
                {u.lastLogin ? new Date(u.lastLogin).toLocaleString() : "-"}
              </td>
              <td style={styles.td}>
                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteUser(u)}
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
