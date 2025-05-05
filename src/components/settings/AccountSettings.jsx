import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AccountSection.css';
import { API_ENDPOINTS } from '../../services/api/config';
import VerificationPopup from './VerificationPopup';
import ConfirmationDialog from './ConfirmationDialog';

const AccountSection = () => {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openVerifyPopup, setOpenVerifyPopup] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [code, setCode] = useState("");
  const [confirmationDialog, setConfirmationDialog] = useState({ open: false, message: '', onConfirm: null });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('Userid');
        if (!userId) throw new Error('User ID not found');

        const { data } = await axios.get(API_ENDPOINTS.SETTINGS_DETAILS(userId));
        const [profile] = data;

        setFormData((prev) => ({
          ...prev,
          email: profile.email || '',
          phone: profile.phone_number || '',
        }));
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('Userid');
      if (!userId) throw new Error('User ID not found');

      const { data } = await axios.get(API_ENDPOINTS.SETTINGS_DETAILS(userId));
      const existingPhone = data[0]?.phone_number;

      if (formData.phone === existingPhone) {
        alert('This phone number is already in use.');
        return;
      }

      setConfirmationDialog({
        open: true,
        message: 'Are you sure you want to update your phone number?',
        onConfirm: async () => {
          await axios.put(API_ENDPOINTS.SETTINGS_UPDATE('phone', userId), {
            phone_number: formData.phone,
          });
          alert('Phone updated successfully!');
          setConfirmationDialog({ open: false, message: '', onConfirm: null });
        },
      });
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleEmailSubmit = async (email) => {
    try {
      const userId = localStorage.getItem('Userid');
      if (!userId) throw new Error('User ID not found');

      const { data } = await axios.get(API_ENDPOINTS.SETTINGS_DETAILS(userId));
      const existingEmail = data[0]?.email;

      if (email === existingEmail) {
        alert('This email is already in use.');
        return;
      }

      setSelectedEmail(email);
      setOpenVerifyPopup(true);

      const randomCode = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
      setCode(randomCode.toString());

      await axios.post(`https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/settings-e6f/v1.0/sendEmail/`, {
        email,
        code: randomCode
      });
      console.log(`Verification code sent to ${email}: ${randomCode}`);
      alert(`Verification code sent to ${email} successfully!`);
    } catch (error) {
      alert(`Failed to send verification code: ${error.response?.data?.message || error.message}`);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }

    setConfirmationDialog({
      open: true,
      message: 'Are you sure you want to update your password?',
      onConfirm: async () => {
        try {
          const userId = localStorage.getItem('Userid');
          if (!userId) throw new Error('User ID not found');

          await axios.put(API_ENDPOINTS.SETTINGS_PASSWORD_UPDATE(userId), {
            current_password: formData.currentPassword,
            new_password: formData.newPassword,
          });

          alert('Password updated successfully!');
          setFormData((prev) => ({
            ...prev,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          }));
          setConfirmationDialog({ open: false, message: '', onConfirm: null });
        } catch (err) {
          alert(`Error: ${err.response?.data?.message || err.message}`);
        }
      },
    });
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="account-section">
      <h2>Account</h2>
      <div className="form-container">
        <form onSubmit={handlePhoneSubmit} className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <button type="submit">Update Phone</button>
        </form>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <button type="submit" onClick={() => handleEmailSubmit(formData.email)}>Update Email</button>
        </div>

        <form onSubmit={handlePasswordSubmit} className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Update Password</button>
        </form>
      </div>

      {openVerifyPopup && <VerificationPopup onClose={() => setOpenVerifyPopup(false)} email={selectedEmail} code={code}/>}

      {confirmationDialog.open && (
        <ConfirmationDialog
          message={confirmationDialog.message}
          onConfirm={confirmationDialog.onConfirm}
          onCancel={() => setConfirmationDialog({ open: false, message: '', onConfirm: null })}
        />
      )}
    </div>
  );
};

export default AccountSection;
