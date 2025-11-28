import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = ({ currentUser }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!currentUser?.id) return;
      try {
        const res = await axios.get(`http://localhost:8000/api/users/${currentUser.id}`, { withCredentials: true });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch user data");
      }
    };
    fetchUser();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/users/logout", {}, { withCredentials: true });
      window.dispatchEvent(new CustomEvent("logout")); // notify App.js
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <p style={{ textAlign: "center", marginTop: "50px", color: "#555" }}>Loading user info...</p>;

  const initials = user.username.charAt(0).toUpperCase();

  return (
    <div style={{ maxWidth: "420px", margin: "100px auto", padding: "25px", borderRadius: "16px", background: "#fff", boxShadow: "0 6px 16px rgba(0,0,0,0.1)", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <div style={{ width: "80px", height: "80px", margin: "0 auto 20px", borderRadius: "50%", backgroundColor: "#0d6efd", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: "bold" }}>
        {initials}
      </div>
      <h3 style={{ marginBottom: "15px", color: "#0d6efd" }}>User Profile</h3>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <button onClick={handleLogout} style={{ width: "100%", padding: "12px", marginTop: "25px", border: "none", borderRadius: "8px", backgroundColor: "#0d6efd", color: "#fff", fontSize: "16px", cursor: "pointer" }}>
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
