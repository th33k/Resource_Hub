import React, { useState, useEffect } from 'react';

const ProfileSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    picture: '',
    bio: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('Userid'); // Get userId from localStorage
        if (!userId) {
          throw new Error('User ID not found in localStorage');
        }

        const response = await fetch(`http://localhost:9090/settings/details/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const data = await response.json();
        if (data.length > 0) {
          const profile = data[0]; // Assuming single profile returned
          setFormData({
            name: profile.username || '',
            picture: profile.profile_picture_url || '',
            bio: profile.additional_details || '',
          });
        }
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
      if (!userId) {
        throw new Error('User ID not found in localStorage');
      }

      const response = await fetch(`http://localhost:9090/settings/profile/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.name,
          profile_picture_url: formData.picture,
          additional_details: formData.bio,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to update profile');
      }

      alert('Profile updated successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow">
      <div className="flex flex-col items-center mb-4">
        <h2 className="text-gray-700 text-xl font-semibold mb-2">Profile</h2>
        {formData.picture && (
          <img
            src={formData.picture}
            alt="Profile"
            className="w-16 h-16 rounded-full"
            onError={() => alert('Invalid image URL')}
          />
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
          <input
            type="url"
            name="picture"
            value={formData.picture}
            onChange={handleChange}
            className="w-full p-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSection;