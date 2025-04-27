import React from "react";
import "./css/ForgotPassword.css";

const ForgotPassword = () => {
  return (
    <div className="forgot-page1">
      <div className="forgot-page">
        {/* Left panel area */}
        <div className="left-panel">
          <div className="logo">
            <img src="/logo.png" alt="Logo" />
          </div>
          <h1>No Worries.!!</h1>
          <a href="/login">
            <button className="back-btn">Take me back.!</button>
          </a>
        </div>

        {/* Form */}
        <div className="form-box">
          <h2>Forgot Password ?</h2>
          <label htmlFor="email">Enter your email</label>
          <div className="box">
            <input type="email" placeholder="Email address" />
          </div>
          <button className="reset-btn">RESET PASSWORD</button>
          <p>
            Go back to login page? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
