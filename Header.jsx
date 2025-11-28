import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ currentUser }) {
  const navigate = useNavigate();

  const [patientDropdownOpen, setPatientDropdownOpen] = useState(false);
  const [medicineDropdownOpen, setMedicineDropdownOpen] = useState(false);
  const [appointmentDropdownOpen, setAppointmentDropdownOpen] = useState(false);

  const patientDropdownRef = useRef(null);
  const medicineDropdownRef = useRef(null);
  const appointmentDropdownRef = useRef(null);

  const togglePatientDropdown = () => setPatientDropdownOpen(!patientDropdownOpen);
  const toggleMedicineDropdown = () => setMedicineDropdownOpen(!medicineDropdownOpen);
  const toggleAppointmentDropdown = () => setAppointmentDropdownOpen(!appointmentDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (patientDropdownRef.current && !patientDropdownRef.current.contains(event.target)) {
        setPatientDropdownOpen(false);
      }
      if (medicineDropdownRef.current && !medicineDropdownRef.current.contains(event.target)) {
        setMedicineDropdownOpen(false);
      }
      if (appointmentDropdownRef.current && !appointmentDropdownRef.current.contains(event.target)) {
        setAppointmentDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3 d-block">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img
            src={`${process.env.PUBLIC_URL}/assets/img/gallery/logo.png`}
            width="118"
            alt="logo"
          />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto pt-2 pt-lg-0 font-base">
            {/* 1️⃣ About Us */}
            <li className="nav-item px-2">
              <a className="nav-link" href="#about">About Us</a>
            </li>

            {/* 2️⃣ Departments */}
            <li className="nav-item px-2">
              <a className="nav-link" href="#departments">Departments</a>
            </li>

            {/* 3️⃣ Patient Dropdown */}
            {currentUser && currentUser.role === "Patient" && (
              <li className="nav-item dropdown px-2" ref={patientDropdownRef}>
                <span
                  className="nav-link dropdown-toggle text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={togglePatientDropdown}
                >
                  Patient
                </span>
                {patientDropdownOpen && (
                  <ul className="dropdown-menu dropdown-menu-end show" style={{ position: "absolute" }}>
                    <li>
                      <span
                        className="dropdown-item"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/addpatient")}
                      >
                        Add Patient Details
                      </span>
                    </li>
                    <li>
                      <span
                        className="dropdown-item"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/patientdetails")}
                      >
                        Patient Details
                      </span>
                    </li>
                  </ul>
                )}
              </li>
            )}

            {/* 4️⃣ Appointment Dropdown */}
            {currentUser && currentUser.role === "Patient" && (
              <li className="nav-item dropdown px-2" ref={appointmentDropdownRef}>
                <span
                  className="nav-link dropdown-toggle text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={toggleAppointmentDropdown}
                >
                  Appointments
                </span>
                {appointmentDropdownOpen && (
                  <ul className="dropdown-menu dropdown-menu-end show" style={{ position: "absolute" }}>
                    <li>
                      <span
                        className="dropdown-item"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/appointments/add")}
                      >
                        Make Appointment
                      </span>
                    </li>
                    {/* <li>
                      <span
                        className="dropdown-item"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/user/appointments")}
                      >
                        View Your Appointments
                      </span>
                    </li> */}
                  </ul>
                )}
              </li>
            )}

            {/* 5️⃣ Medicine Dropdown */}
            {currentUser && (
              <li className="nav-item dropdown px-2" ref={medicineDropdownRef}>
                <span
                  className="nav-link dropdown-toggle text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={toggleMedicineDropdown}
                >
                  Medicine
                </span>
                {medicineDropdownOpen && (
                  <ul className="dropdown-menu dropdown-menu-end show" style={{ position: "absolute" }}>
                    <li>
                      <span
                        className="dropdown-item"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/buymedicine")}
                      >
                        Add Medicine
                      </span>
                    </li>
                    <li>
                      <span
                        className="dropdown-item"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/ordermedicine")}
                      >
                        View Your Orders
                      </span>
                    </li>
                  </ul>
                )}
              </li>
            )}

            {/* 5️⃣ Contact Dropdown */}
            <li className="nav-item dropdown px-2">
              <span
                className="nav-link dropdown-toggle"
                style={{ cursor: "pointer" }}
                data-bs-toggle="dropdown"
              >
                Contact
              </span>
              <ul className="dropdown-menu" aria-labelledby="contactDropdown">
                <li><a className="dropdown-item" href="/contact">Submit Query</a></li>
                <li><a className="dropdown-item" href="/contactlist">Contact Details</a></li>
              </ul>
            </li>

            {/* 6️⃣ Feedback Dropdown */}
            <li className="nav-item dropdown px-2">
              <span
                className="nav-link dropdown-toggle"
                style={{ cursor: "pointer" }}
                data-bs-toggle="dropdown"
              >
                Feedback
              </span>
              <ul className="dropdown-menu" aria-labelledby="feedbackDropdown">
                <li><a className="dropdown-item" href="/feedback">Submit Feedback</a></li>
                <li><a className="dropdown-item" href="/feedbacklist">Feedback Details</a></li>
              </ul>
            </li>
          </ul>

          {/* User Settings or Sign In */}
          {currentUser && currentUser.role === "Patient" && (
            <span
              className="nav-link ms-lg-4"
              style={{ fontSize: "20px", cursor: "pointer" }}
              onClick={() => navigate("/userprofile")}
              title="User Profile"
            >
              ⚙️
            </span>
          )}
          {!currentUser && (
            <button
              className="btn btn-sm btn-outline-primary rounded-pill order-1 order-lg-0 ms-lg-4"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
