import { useState } from 'react';
import { Dialog, Input, Button } from '@mui/material';
import { X } from 'lucide-react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import '../css/Meal/AddMealPopup.css'

export const MealCardPopup = ({ open, onClose, title, subtitle }) => {
  const [mealName, setMealName] = useState('');
  const [mealImage, setMealImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMealImage(file);
    }
  };

  const handleSubmit = () => {
    if (mealImage && mealName) {

      console.log('Meal Name:', mealName);
      console.log('Meal Image:', mealImage);

      onClose();
    } else {
      alert("Please provide both meal name and image");
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
            <label className="mealtime-label">Meal Time Image</label>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              className="mealtime-upload-btn"
            >
              <CloudUploadIcon className="mealtime-upload-icon" />
              Upload Meal Image
              <Input
                type="file"
                hidden
                onChange={handleImageUpload}
              />
            </Button>
          </div>


          {mealImage && (
            <div className="mealtime-image-preview">
              <h3>Preview:</h3>
              <img
                src={URL.createObjectURL(mealImage)}
                alt="Meal Preview"
                className="mealtime-preview-img"
              />
            </div>
          )}
          <div className="mealtime-input-group">
            <label className="mealtime-label">Meal Time Name</label>
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
