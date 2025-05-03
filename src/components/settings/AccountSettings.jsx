import React, { useState, useEffect } from 'react';
import './AccountSection.css';
import { API_ENDPOINTS } from '../../services/api/config';

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

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('Userid');
        if (!userId) throw new Error('User ID not found');

        const response = await fetch(API_ENDPOINTS.SETTINGS_DETAILS(userId));
        if (!response.ok) throw new Error('Failed to fetch user details');

        const [profile] = await response.json();
        setFormData((prev) => ({
          ...prev,
          email: profile.email || '',
          phone: profile.phone_number || '',
        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e, type) => {
    e.preventDefault();
    const value = formData[type];
    if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      alert('Invalid email');
      return;
    }
    if (type === 'phone' && !/^\+?[1-9]\d{1,14}$/.test(value)) {
      alert('Invalid phone number');
      return;
    }

    try {
      const userId = localStorage.getItem('Userid');
      if (!userId) throw new Error('User ID not found');

      const endpoint = type === 'email' ? 'email' : 'phone';
      const payload = type === 'email' ? { email: value } : { phone_number: value };

      const response = await fetch(API_ENDPOINTS.SETTINGS_UPDATE(endpoint, userId), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error((await response.json()).message || `Failed to update ${type}`);

      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const userId = localStorage.getItem('Userid');
      if (!userId) throw new Error('User ID not found');

      const response = await fetch(API_ENDPOINTS.SETTINGS_PASSWORD_UPDATE(userId), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          current_password: formData.currentPassword,
          new_password: formData.newPassword,
        }),
      });

      if (!response.ok) throw new Error((await response.json()).message || 'Failed to update password');

      alert('Password updated successfully!');
      setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="account-section">
      <h2>Account</h2>
      <div className="form-container">
        {/* Phone */}
        <form onSubmit={(e) => handleContactSubmit(e, 'phone')} className="form-group">
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

        {/* Email */}
        <form onSubmit={(e) => handleContactSubmit(e, 'email')} className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <button type="submit">Update Email</button>
        </form>

        {/* Password */}
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
    </div>
  );
};

export default AccountSection;