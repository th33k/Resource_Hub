import React, { useState } from 'react';
import './VerifyPopup.css';
import axios from 'axios';
import { API_ENDPOINTS } from '../../services/api/config';

function VerificationPopup({ onClose, email, code }) {
  const [inputcode, setInputCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputcode === code) {
      try {
        const userId = localStorage.getItem('Userid');
        if (!userId) throw new Error('User ID not found');

        await axios.put(API_ENDPOINTS.SETTINGS_UPDATE('email', userId), { email });
        alert("Verification successful!");
        onClose();
      } catch (error) {
        console.error("There was an error verifying the email!", error);
        alert("Verification failed. Please try again.");
      }
    } else {
      alert("Invalid verification code. Please try again.");
      console.log("Invalid code entered:", inputcode);
      console.log("Expected code:", code);
    }
  };

  return (
    <div className='verify-outer'>
      <div className='verify-inner'>
        <h1 className="verify-title">Email Verification</h1>
        <form className="verify-form" onSubmit={handleSubmit}>
          <label htmlFor="verifycode" className="verify-label">
            Verification Code
          </label>
          <input
            type="text"
            name="verifycode"
            id="verifycode"
            placeholder="Enter Verification Code"
            className="verify-input"
            value={inputcode}
            onChange={(e) => setInputCode(e.target.value)}
            required
          />
          <div className="verify-buttons">
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" className="back-btn" onClick={onClose}>Back</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerificationPopup;
