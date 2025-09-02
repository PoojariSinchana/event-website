import React from "react";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext";  
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // 👈 redirect to Home instead of Login
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo">BookUsNow</h2>
        <span className="location">📍 Mumbai, India</span>
      </div>

      <div className="nav-right">
        <button className="icon-btn">🔍</button>
        <button className="icon-btn">❤️</button>

        {user ? (
          <>
            <span>Hi, {user.name || "User"}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="logout-btn" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="logout-btn" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
