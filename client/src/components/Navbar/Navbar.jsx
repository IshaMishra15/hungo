import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Navbar.css"; // Import the CSS file for styling

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // Notify the server about the logout
        await axios.post(
          "http://localhost:5000/api/logout",
          {},
          {
            headers: { Authorization: ` Bearer ${token}` },
          }
        );
      }
      // Remove token from localStorage
      localStorage.removeItem("token");
      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span>huNGO</span>
      </div>
      <ul className="navbar-menu">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          {/* <Link to="/contact">Contact</Link> */}
          <a href="#footer">Contact Us</a>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/addFood">Add Food</Link>
        </li>
      </ul>
      <div className="navbar-actions">
        <button onClick={handleLogout} className="logout-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="navbar-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
