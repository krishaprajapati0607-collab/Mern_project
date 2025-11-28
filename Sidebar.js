import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .sidebar {
          width: 240px;
          height: 100vh;
          background: #2f855a; /* green shade */
          color: #fff;
          display: flex;
          flex-direction: column;
          padding: 1.5rem 1rem;
          position: fixed;
          top: 0;
          left: 0;
          transition: all 0.3s ease;
          box-shadow: 2px 0 8px rgba(0,0,0,0.15);
        }
        .sidebar h2 {
          font-size: 1.4rem;
          margin-bottom: 2rem;
          text-align: center;
          color: #c6f6d5; /* light green */
        }
        .sidebar ul {
          list-style: none;
          padding: 0;
          margin: 0;
          flex: 1;
        }
        .sidebar li {
          margin-bottom: 1rem;
        }
        .sidebar button {
          width: 100%;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 1rem;
          text-align: left;
          padding: 10px 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .sidebar button:hover {
          background: #38a169; /* brighter green on hover */
        }
        .sidebar-footer {
          text-align: center;
          font-size: 0.85rem;
          color: #a0aec0;
          margin-top: auto;
        }
      `}</style>

      <div className="sidebar">
        <h2>📋 Admin Panel</h2>
        <ul>
          <li><button onClick={() => navigate("/admin")}>🏠 Dashboard</button></li>
          <li><button onClick={() => navigate("/admin/users")}>👥 Users</button></li>
          <li><button onClick={() => navigate("/departments")}>🏥 Departments</button></li>
          <li><button onClick={() => navigate("/doctors")}>🧑‍⚕️ Doctors</button></li>
          <li><button onClick={() => navigate("/patients")}>👩‍🦽 Patients</button></li>
          <li><button onClick={() => navigate("/appointments")}>📅 Appointments</button></li>
          <li><button onClick={() => navigate("/medicines")}>💊 Medicines</button></li>
          <li><button onClick={() => navigate("/ordermedicine")}>📦 Orders</button></li>
          <li><button onClick={() => navigate("/admin/contacts")}>📇 Contacts</button></li>
          <li><button onClick={() => navigate("/admin/feedbacks")}>💬 Feedbacks</button></li>
          <li>
              <button onClick={() => {
                // Clear any stored user data (optional)
                localStorage.removeItem("user");
                sessionStorage.removeItem("user");

                // Navigate to login page
                navigate("/login");
              }}>
                🚪 Logout
              </button>
            </li>
        </ul>

        <div className="sidebar-footer">
          © 2025 LIVEDOC
        </div>
      </div>
    </>
  );
}







