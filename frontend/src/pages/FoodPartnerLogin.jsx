import React from "react";
import "../styles/auth.css";

const FoodPartnerLogin = () => {
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

          <form className="auth-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="Enter your business email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
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
