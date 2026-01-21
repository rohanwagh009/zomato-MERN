import React from "react";
import "../styles/auth.css";

const FoodPartnerRegister = () => {
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">🏪</div>
            <h1 className="auth-title">Join as Partner</h1>
            <p className="auth-subtitle">
              Register your restaurant and reach more customers
            </p>
            <span className="auth-type-badge">Food Partner</span>
          </div>

          <form className="auth-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="John"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

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
                placeholder="Create password"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Contact Person Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Contact person's name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-input"
                placeholder="Enter phone number"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Restaurant Address</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter full address"
                required
              />
            </div>

            <div className="form-checkbox">
              <input
                type="checkbox"
                id="terms-partner"
                className="checkbox-input"
                required
              />
              <label htmlFor="terms-partner" className="checkbox-label">
                I agree to the <a href="#">Partner Terms</a> and{" "}
                <a href="#">Privacy Policy</a>
              </label>
            </div>

            <div className="auth-button-group">
              <button type="submit" className="btn btn-primary">
                Register Restaurant
              </button>
            </div>
          </form>

          <div className="auth-footer">
            <span className="auth-footer-text">
              Already registered?
              <a href="/food-partner/login" className="auth-footer-link">
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
                Looking to order food?
                <a href="/user/register" className="auth-footer-link">
                  Register as User
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
