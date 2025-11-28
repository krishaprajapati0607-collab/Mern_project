// src/components/Header.jsx
import React, { useEffect, useState } from "react";

export default function Header() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // ✅ Get user from localStorage
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const navbar = document.querySelector("[data-navbar-on-scroll]");
    if (!navbar) return;

    const onScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add("navbar-shrink");
      } else {
        navbar.classList.remove("navbar-shrink");
      }
    };

    onScroll(); // run once on load
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top py-3 d-block"
      data-navbar-on-scroll="data-navbar-on-scroll"
    >
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
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"> </span>
        </button>

        <div
          className="collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto pt-2 pt-lg-0 font-base">
            <li className="nav-item px-2"><a className="nav-link" href="#about">About Us</a></li>
            <li className="nav-item px-2"><a className="nav-link" href="#departments">Departments</a></li>
            <li className="nav-item px-2"><a className="nav-link" href="#findUs">Membership</a></li>
            <li className="nav-item px-2"><a className="nav-link" href="#findUs">Patient Details</a></li>
            <li className="nav-item px-2"><a className="nav-link" href="#help">Help</a></li>
            <li className="nav-item px-2"><a className="nav-link" href="#contact">Contact</a></li>
          </ul>

          {/* Show Sign In by default, ⚙️ after login */}
          {currentUser ? (
            <a
              className="nav-link ms-lg-4"
              href="/userprofile"
              title="User Profile"
              style={{ fontSize: "20px", cursor: "pointer" }}
            >
              ⚙️
            </a>
          ) : (
            <a
              className="btn btn-sm btn-outline-primary rounded-pill order-1 order-lg-0 ms-lg-4"
              href="/register"
            >
              Sign In
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
