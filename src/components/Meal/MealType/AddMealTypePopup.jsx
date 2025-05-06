import { useState } from 'react';
import { Dialog, Input, Button, Typography } from '@mui/material';
import { X } from 'lucide-react';
import '../Meal-CSS/AddMealPopup.css';
import { BASE_URLS } from '../../../services/api/config';
import { toast } from "react-toastify";

export const MealCardPopup = ({ open, onClose, title, subtitle, onSubmit }) => {
  const [mealName, setMealName] = useState('');
  const [mealImageUrl, setMealImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const fileURL = URL.createObjectURL(file); // Create a preview URL
      setMealImageUrl(fileURL); // Set preview URL
    }
  };

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async () => {
    if (!imageFile) {
      toast.error('Please select an image to upload');
      return null;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'ResourceHub'); // Your upload preset
    formData.append('cloud_name', 'dyjwjhekd'); // Your Cloudinary cloud name

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dyjwjhekd/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setUploading(false);
      return data.secure_url; // Cloudinary URL
    } catch (error) {
      console.error('Upload failed:', error);
      setUploading(false);
      toast.error('Image upload failed. Please try again.');
      return null;
    }
  };

  const handleSubmit = async () => {
    const imageUrl = await uploadImageToCloudinary();
    if (!imageUrl) return;

    setMealImageUrl(imageUrl); // Save Cloudinary image URL

    if (imageUrl && mealName) {
      try {
        const response = await fetch(`${BASE_URLS.mealtype}/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mealtype_name:mealName,
            mealtype_image_url: imageUrl, // Use the Cloudinary image URL
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Server Response:', result);
        onClose();
        onSubmit(); // Refresh meal type list
      } catch (error) {
        console.error('Fetch error:', error);
        toast.error('Failed to add meal type. Please try again.');
      }
    } else {
      toast.error('Please provide both meal name and an image.');
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
            <label className="mealtime-label">Meal Type Image</label>
            {/* MUI Input component for file uploads */}
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              fullWidth
            />
          </div>

          {/* Image Preview */}
          {mealImageUrl && (
            <div className="mealtime-image-preview">
              <Typography variant="h6">Preview:</Typography>
              <img
                src={mealImageUrl}
                alt="Meal Type Preview"
                className="mealtime-preview-img"
                style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'cover' }}
              />
            </div>
          )}

          <div className="mealtime-input-group">
            <label className="mealtime-label">Meal Type Name</label>
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
          <button onClick={onClose} className="mealtime-cancel-btn">Cancel</button>
          <button onClick={handleSubmit} className="mealtime-submit-btn" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      </div>
    </Dialog>
  );
};
