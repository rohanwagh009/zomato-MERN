import React from "react";
import "../../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FoodPartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;

    axios
      .post(
        "http://localhost:3000/api/auth/food-partner/register",
        {
          name:businessName,
          contactName,
          email,
          password,
          phone,
          address,
        },
        { withCredentials: true },
      )
      .then((response) => {
        console.log(response.data);
        navigate("/create-food"); // redirect to login page after successful registration
      })
      .catch((error) => {
        console.error(
          "There was an error registering the food partner!",
          error,
        );
        alert(error.response?.data?.message || "Registration failed");
      });
  };

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

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Business Name</label>
              <input
                type="text"
                name="businessName"
                className="form-input"
                placeholder="Restaurant Name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Contact Person Name</label>
              <input
                type="text"
                name="contactName"
                className="form-input"
                placeholder="Contact person's name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Create password"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                placeholder="Enter phone number"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Restaurant Address</label>
              <input
                type="text"
                name="address"
                className="form-input"
                placeholder="Enter full address"
                required
              />
            </div>

            <div className="form-checkbox">
              <input
                type="checkbox"
                id="terms-partner"
                name="terms"
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
