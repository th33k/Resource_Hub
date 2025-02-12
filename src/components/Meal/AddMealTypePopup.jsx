import { useState } from 'react';
import { Dialog, Input, Button } from '@mui/material';
import { X } from 'lucide-react';
import '../css/Meal/AddMealPopup.css';

export const MealCardPopup = ({ open, onClose, title, subtitle }) => {
  const [mealName, setMealName] = useState('');
  const [mealImageUrl, setMealImageUrl] = useState('');

  const handleUrlChange = (e) => {
    setMealImageUrl(e.target.value);
  };

  const handleSubmit = async () => {
    if (mealImageUrl && mealName) {
      try {
        const response = await fetch('http://localhost:9091/mealtype', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mealName,
            mealImageUrl,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Server Response:', result);
        onClose(); 
      } catch (error) {
        console.error('Fetch error:', error);
        alert('Failed to add meal. Please try again.');
      }
    } else {
      alert('Please provide both meal name and image URL');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <div className="mealtime-popup-container">
        <div className="mealtime-popup-header">
          <div>
            <h2 className="mealtime-title">{title}</h2>
            <p className="mealtime-subtitle">{subtitle}</p>
          </div>
          <button onClick={onClose} className="mealtime-close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="mealtime-form">

          <div className="mealtime-input-group">
            <label className="mealtime-label">Meal Image URL</label>
            <Input
              type="text"
              value={mealImageUrl}
              onChange={handleUrlChange}
              fullWidth
              className="mealtime-input"
              placeholder="Enter image URL here"
            />
          </div>

          {mealImageUrl && (
            <div className="mealtime-image-preview">
              <h3>Preview:</h3>
              <img
                src={mealImageUrl}
                alt="Meal Preview"
                className="mealtime-preview-img"
              />
            </div>
          )}

          <div className="mealtime-input-group">
            <label className="mealtime-label">Meal Name</label>
            <Input
              type="text"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              fullWidth
              className="mealtime-input"
            />
          </div>
        </div>

        <div className="mealtime-buttons">
          <button
            onClick={onClose}
            className="mealtime-cancel-btn"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="mealtime-submit-btn"
          >
            Submit
          </button>
        </div>
      </div>
    </Dialog>
  );
};