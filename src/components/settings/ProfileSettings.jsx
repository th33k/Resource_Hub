import React, { useState, useEffect } from 'react';
import './ProfileSection.css';
import { API_ENDPOINTS } from '../../services/api/config';

const ProfileSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    picture: '',
    bio: '',
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
        setFormData({
          name: profile.username || '',
          picture: profile.profile_picture_url || '',
          bio: profile.additional_details || '',
        });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Name is required');
      return;
    }
    if (formData.bio.length > 100) {
      alert('Bio cannot exceed 100 characters');
      return;
    }

    try {
      const userId = localStorage.getItem('Userid');
      if (!userId) throw new Error('User ID not found');

      const response = await fetch(API_ENDPOINTS.SETTINGS_PROFILE_UPDATE(userId), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.name,
          profile_picture_url: formData.picture,
          additional_details: formData.bio,
        }),
      });

      if (!response.ok) throw new Error((await response.json()).message || 'Failed to update profile');

      alert('Profile updated successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="profile-section">
      <div className="header">
        <h2>Profile</h2>
        {formData.picture && (
          <img
            src={formData.picture}
            alt="Profile"
            onError={() => alert('Invalid image URL')}
          />
        )}
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Profile Picture URL</label>
          <input
            type="url"
            name="picture"
            value={formData.picture}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default ProfileSection;