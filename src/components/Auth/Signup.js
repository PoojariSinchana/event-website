import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../Navbar";
import "./Signup.css"; // import CSS file

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(form);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <div className="signup-box">
          <h2 className="signup-title">Create Account</h2>
          <p className="signup-subtitle">
            Sign up with your email and password.
          </p>

          {error && <div className="signup-error">{error}</div>}

          <form onSubmit={onSubmit} className="signup-form">
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="signup-input"
              value={form.email}
              onChange={onChange}
            />
            <input
              name="username"
              required
              placeholder="Username"
              className="signup-input"
              value={form.username}
              onChange={onChange}
            />
            <input
              name="password"
              type="password"
              required
              placeholder="Password"
              className="signup-input"
              value={form.password}
              onChange={onChange}
            />
            <button type="submit" disabled={loading} className="signup-button">
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>

          <p className="signup-footer">
            Already have an account?{" "}
            <Link to="/login" className="signup-link">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

