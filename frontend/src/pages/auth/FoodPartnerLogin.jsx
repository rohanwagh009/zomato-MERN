import React from "react";
import "../../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const FoodPartnerLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/food-partner/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      console.log(response.data);
      login(response.data);
      navigate("/create-food"); // redirect to home page after login
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">🏪</div>
            <h1 className="auth-title">Partner Login</h1>
            <p className="auth-subtitle">Sign in to manage your restaurant</p>
            <span className="auth-type-badge">Food Partner</span>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your business email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-checkbox">
              <input
                type="checkbox"
                id="remember-partner"
                className="checkbox-input"
              />
              <label htmlFor="remember-partner" className="checkbox-label">
                Remember me
              </label>
            </div>

            <a
              href="#"
              style={{
                textAlign: "right",
                color: "var(--accent-primary)",
                textDecoration: "none",
                fontSize: "13px",
                marginTop: "-8px",
              }}
            >
              Forgot password?
            </a>

            <div className="auth-button-group">
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </div>
          </form>

          <div className="auth-footer">
            <span className="auth-footer-text">
              New to Zomato Partner?
              <a href="/food-partner/register" className="auth-footer-link">
                Register your restaurant
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
