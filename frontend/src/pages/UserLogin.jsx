import React from "react";
import "../styles/auth.css";

const UserLogin = () => {
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">🍔</div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to your account to continue</p>
            <span className="auth-type-badge">User Login</span>
          </div>

          <form className="auth-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email"
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
              <input type="checkbox" id="remember" className="checkbox-input" />
              <label htmlFor="remember" className="checkbox-label">
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
              Don't have an account?
              <a href="/user/register" className="auth-footer-link">
                Create one
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
