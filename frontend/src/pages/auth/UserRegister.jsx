import React from "react";
import "../../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post(
      "http://localhost:3000/api/auth/user/register",
      {
        fullName: firstName + " " + lastName,
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );

    console.log(response.data);

    Navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">🍔</div>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join us to discover amazing food</p>
            <span className="auth-type-badge">User Registration</span>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-input"
                  placeholder="John"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-input"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Create password"
              />
            </div>

            <div className="form-checkbox">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className="checkbox-input"
              />
              <label htmlFor="terms" className="checkbox-label">
                I agree to the <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>
              </label>
            </div>

            <div className="auth-button-group">
              <button type="submit" className="btn btn-primary">
                Create Account
              </button>
            </div>
          </form>

          <div className="auth-footer">
            <span className="auth-footer-text">
              Already have an account?
              <a href="/user/login" className="auth-footer-link">
                Sign in
              </a>
            </span>
            <div
              style={{
                marginTop: "16px",
                paddingTop: "16px",
                borderTop: "1px solid var(--border-color)",
              }}
            >
              <span className="auth-footer-text">
                Want to register a restaurant?
                <a href="/food-partner/register" className="auth-footer-link">
                  Register as Food Partner
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
