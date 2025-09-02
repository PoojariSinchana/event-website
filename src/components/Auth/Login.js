import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../Navbar";
import "./Login.css"; // <-- import CSS file

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
      navigate("/events");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Welcome back</h2>
          <p className="login-subtitle">Log in to continue.</p>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={onSubmit} className="login-form">
            <input
              name="username"
              type="text"
              required
              placeholder="Username"
              className="login-input"
              value={form.username}
              onChange={onChange}
            />
            <input
              name="password"
              type="password"
              required
              placeholder="Password"
              className="login-input"
              value={form.password}
              onChange={onChange}
            />
            <button
              type="submit"
              disabled={loading}
              className="login-button"
            >
              {loading ? "Signing in..." : "Log In"}
            </button>
          </form>

          <p className="login-footer">
            New here?{" "}
            <Link to="/signup" className="login-link">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
