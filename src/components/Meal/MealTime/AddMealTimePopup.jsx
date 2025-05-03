import { useState } from 'react';
import { Dialog, Input, Button, Typography } from '@mui/material';
import { X } from 'lucide-react';
import '../Meal-CSS/AddMealPopup.css';
import { API_ENDPOINTS } from '../../../services/api/config';

export const MealCardPopup = ({ open, onClose, title, subtitle, onSubmit }) => {
  const [mealName, setMealName] = useState('');
  const [mealImageUrl, setMealImageUrl] = useState('');

  const handleSubmit = async () => {
    if (mealImageUrl && mealName) {
      try {
        const response = await fetch(API_ENDPOINTS.MEAL_TIME_ADD, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mealName,
            mealImageUrl, // Use the provided image URL
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Server Response:', result);
        onClose();
        onSubmit(); // Refresh meal list
      } catch (error) {
        console.error('Fetch error:', error);
        alert('Failed to add meal. Please try again.');
      }
    } else {
      alert('Please provide both meal name and an image URL.');
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
        {/* Preview of image from URL */}
        {mealImageUrl && (
            <div className="mealtime-image-preview">
              <Typography variant="h6">Preview:</Typography>
              <img
                src={mealImageUrl}
                alt="Meal Preview"
                className="mealtime-preview-img"
                style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'cover' }}
                onError={() => alert('Invalid image URL')}
              />
            </div>
          )}

        <div className="mealtime-form">
          <div className="mealtime-input-group">
            <label className="mealtime-label">Meal Time Image URL</label>
            <Input
              type="text"
              value={mealImageUrl}
              onChange={(e) => setMealImageUrl(e.target.value)}
              fullWidth
              className="mealtime-input"
              placeholder="Enter image URL"
              style={{ color: 'black' }}
            />
          </div>

          
          <div className="mealtime-input-group">
            <label className="mealtime-label">Meal Time Name</label>
            <Input
              type="text"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              fullWidth
              className="mealtime-input"
              style={{ color: 'black' }}
            />
          </div>
        </div>

        <div className="mealtime-buttons">
          <button onClick={onClose} className="mealtime-cancel-btn">Cancel</button>
          <button onClick={handleSubmit} className="mealtime-submit-btn">
            Submit
          </button>
        </div>
      </div>
    </Dialog>
  );
};