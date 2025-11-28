
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: 0,
    doctors: 0,
    departments: 0,
    appointments: 0,
  });

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .main-content {
          margin-left: 220px;
          padding: 20px;
          min-height: 100vh;
          background-color: #f4f6f9;
        }

        .dashboard-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .dashboard-title {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(90deg, #16a085, #1abc9c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
        }

        .dashboard-title::after {
          content: "";
          display: block;
          width: 100px;
          height: 3px;
          background: #16a085;
          margin: 8px auto 0;
          border-radius: 2px;
          box-shadow: 0 0 10px #16a085;
        }

        .dashboard-subtitle {
          font-size: 16px;
          font-weight: 500;
          margin-top: 10px;
          background: linear-gradient(90deg, #16a085, #1abc9c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
        }

        .dashboard-subtitle::after {
          content: "";
          display: block;
          width: 80px;
          height: 2px;
          background: #16a085;
          margin: 6px auto 0;
          border-radius: 2px;
          box-shadow: 0 0 8px #16a085;
        }

        .stats-row {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
          width: 200px;
        }

        .stat-card h3 {
          margin: 0;
          font-size: 24px;
          color: #27ae60;
        }

        .stat-card p {
          margin: 5px 0 0;
          font-size: 14px;
          color: #7f8c8d;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .dashboard-card {
          background: linear-gradient(135deg, #1abc9c, #16a085);
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.15);
          color: #fff;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }

        .dashboard-card h2 {
          margin: 0 0 10px 0;
          font-size: 18px;
          font-weight: 600;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
        }

        .dashboard-card p {
          font-size: 13px;
          margin-bottom: 15px;
          color: rgba(255,255,255,0.85);
        }

        .dashboard-card button {
          align-self: flex-start;
          padding: 6px 12px;
          font-size: 13px;
          background: #fff;
          color: #16a085;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dashboard-card button:hover {
          background: rgba(255,255,255,0.9);
          transform: translateY(-2px);
        }

        .dashboard-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.2);
        }

        .card-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: #fff;
          color: #16a085;
          padding: 4px 10px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 12px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }

        .quick-add-title {
          margin-bottom: 15px;
          color: #16a085;
          font-size: 22px;
          font-weight: 700;
          text-align: center;
          background: linear-gradient(90deg, #16a085, #1abc9c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
        }

        .quick-add-title::after {
          content: "";
          display: block;
          width: 80px;
          height: 3px;
          background: #16a085;
          margin: 8px auto 0;
          border-radius: 2px;
          box-shadow: 0 0 10px #16a085;
        }
      `}</style>

      <Sidebar handleLogout={handleLogout} />

      <div className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <p className="dashboard-subtitle">Manage everything in one place</p>
        </div>

        <div className="stats-row">
          <div className="stat-card">
            <h3>{stats.users}</h3>
            <p>Registered Users</p>
          </div>
          <div className="stat-card">
            <h3>{stats.departments}</h3>
            <p>Departments</p>
          </div>
          <div className="stat-card">
            <h3>{stats.doctors}</h3>
            <p>Doctors</p>
          </div>
          <div className="stat-card">
            <h3>{stats.appointments}</h3>
            <p>Appointments</p>
          </div>
        </div>

        <h3 className="quick-add-title">QUICK ADD</h3>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-badge">{stats.users}</div>
            <h2>👥 Users</h2>
            <p>View and manage all registered users.</p>
            <button onClick={() => navigate("/admin/users")}>View Users</button>
          </div>
          <div className="dashboard-card">
            <div className="card-badge">{stats.departments}</div>
            <h2>🏥 Departments</h2>
            <p>Explore hospital departments and facilities.</p>
            <button onClick={() => navigate("/departments")}>View Departments</button>
          </div>
          <div className="dashboard-card">
            <div className="card-badge">{stats.doctors}</div>
            <h2>🧑‍⚕️ Doctors</h2>
            <p>Manage doctor profiles, specializations, and schedules.</p>
            <button onClick={() => navigate("/doctors")}>View Doctors</button>
          </div>
          <div className="dashboard-card">
            <div className="card-badge">{stats.appointments}</div>
            <h2>📅 Appointments</h2>
            <p>Track and schedule appointments with doctors.</p>
            <button onClick={() => navigate("/appointments")}>Manage Appointments</button>
          </div>
        </div>
      </div>
    </>
  );
}































// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

//   const handleLogout = () => {
//     localStorage.removeItem("currentUser");
//     navigate("/login");
//   };

//   return (
//     <>
//       {/* Inbuilt CSS */}
//       <style>{`
//         body {
//           margin: 0;
//           font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
//           background: #f5f9fc;
//           color: #333;
//         }
//         .dashboard-container { text-align: center; padding: 2rem; }
//         .dashboard-title { font-size: 2rem; color: #2c7a7b; margin-bottom: 0.5rem; }
//         .dashboard-subtitle { font-size: 1rem; color: #555; margin-bottom: 2rem; }
//         .dashboard-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 1.5rem;
//           padding: 0 1rem;
//         }
//         .dashboard-card {
//           background: #fff;
//           border-radius: 16px;
//           padding: 1.5rem;
//           box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
//           transition: transform 0.2s ease, box-shadow 0.2s ease;
//           text-align: left;
//         }
//         .dashboard-card h2 { color: #2c7a7b; margin-bottom: 0.5rem; }
//         .dashboard-card p { font-size: 0.9rem; color: #555; margin-bottom: 1rem; }
//         .dashboard-card button {
//           background: #2c7a7b;
//           color: white;
//           border: none;
//           padding: 10px 16px;
//           border-radius: 8px;
//           cursor: pointer;
//           font-size: 0.9rem;
//           transition: background 0.3s ease;
//         }
//         .dashboard-card button:hover { background: #38b2ac; }
//         .dashboard-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
//         }
//         .dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
//         .logout-btn {
//           padding: 10px 18px;
//           background: #e63946;
//           color: #fff;
//           border: none;
//           border-radius: 8px;
//           font-size: 0.95rem;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }
//         .logout-btn:hover {
//           background: #c82333;
//           transform: translateY(-2px);
//           box-shadow: 0px 4px 10px rgba(230, 57, 70, 0.3);
//         }
//       `}</style>

//       {/* Dashboard Layout */}
//       <div className="dashboard-container">
//         <div className="dashboard-header">
//           <h1 className="dashboard-title">LIVEDOC Admin</h1>
//           <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
//         </div>

//         <p className="dashboard-subtitle">Manage everything in one place</p>

//         <div className="dashboard-grid">
//           {/* 1️⃣ Users */}
//           <div className="dashboard-card">
//             <h2>👥 Users</h2>
//             <p>View and manage all registered users.</p>
//             <button onClick={() => navigate("/admin/users")}>View Users</button>
//           </div>

//           {/* 2️⃣ Departments */}
//           <div className="dashboard-card">
//             <h2>🏥 Departments</h2>
//             <p>Explore hospital departments and facilities.</p>
//             <button onClick={() => navigate("/departments")}>View Departments</button>
//           </div>

//           {/* 3️⃣ Doctors */}
//           <div className="dashboard-card">
//             <h2>🧑‍⚕️ Doctors</h2>
//             <p>Manage doctor profiles, specializations, and schedules.</p>
//             <button onClick={() => navigate("/doctors")}>View Doctors</button>
//           </div>

//           {/* 4️⃣ Patients */}
//           <div className="dashboard-card">
//             <h2>👩‍🦽 Patients</h2>
//             <p>View patient details, medical history, and records.</p>
//             <button onClick={() => navigate("/patients")}>View Patients</button>
//           </div>

//           {/* 5️⃣ Appointments */}
//           <div className="dashboard-card">
//             <h2>📅 Appointments</h2>
//             <p>Track and schedule appointments with doctors.</p>
//             <button onClick={() => navigate("/appointments")}>Manage Appointments</button>
//           </div>

//           {/* 6️⃣ Medicines */}
//           <div className="dashboard-card">
//             <h2>💊 Medicines</h2>
//             <p>Manage medicine stock and prescriptions.</p>
//             <button onClick={() => navigate("/medicines")}>View Medicines</button>
//           </div>

//           {/* 7️⃣ Medicine Orders */}
//           <div className="dashboard-card">
//             <h2>📦 Medicine Orders</h2>
//             <p>View and manage all medicine orders placed by users.</p>
//             <button onClick={() => navigate("/ordermedicine")}>View Orders</button>
//           </div>

//           {/* 8️⃣ Contact */}
//           <div className="dashboard-card">
//             <h2>📇 Contact</h2>
//             <p>Explore Contacts.</p>
//             <button onClick={() => navigate("/admin/contacts")}>View Contacts</button>
//           </div>

//           {/* 9️⃣ Feedback */}
//           <div className="dashboard-card">
//             <h2>💬 Feedback</h2>
//             <p>Explore Feedbacks.</p>
//             <button onClick={() => navigate("/admin/feedbacks")}>View Feedbacks</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
  