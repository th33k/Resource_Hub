// AddAssetPopup.js
import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

function AddAssetPopup({ open, onClose, onAdd }) {
  const [newAsset, setNewAsset] = useState({
    name: "",
    category: "",
    quantity: "",
    condition: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAsset((prev) => ({ ...prev, [name]: value }));
  };


  const handleAddAsset = async () => {
    if (!newAsset.name || !newAsset.category || !newAsset.quantity || !newAsset.condition || !newAsset.location) {
      alert("Please fill in all fields");
      return;
    }
    
    try {
      const response = await fetch('http://localhost:9090/asset/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          asset_name: newAsset.name,
          category: newAsset.category,
          quantity: newAsset.quantity,
          condition_type: newAsset.condition,
          location: newAsset.location,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Clear the form fields after successful addition
      setNewAsset({
        name: "",
        category: "",
        quantity: "",
        condition: "",
        location: "",
      });

      onAdd(); // Notify parent to refresh or handle after asset addition
      onClose(); // Close the popup after adding the asset
    } catch (error) {
      console.error("Error adding asset:", error);
      alert("Failed to add asset.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Asset</DialogTitle>
      <DialogContent>
        <TextField
          label="Asset Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={newAsset.name}
          onChange={handleInputChange}
        />
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={newAsset.category}
            onChange={handleInputChange}
            label="Category"
          >
            <MenuItem value="Electronics & IT">Electronics & IT</MenuItem>
            <MenuItem value="Stationery">Stationery</MenuItem>
            <MenuItem value="Furniture">Furniture</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Quantity"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          name="quantity"
          value={newAsset.quantity}
          onChange={handleInputChange}
        />
        <TextField
          label="Condition"
          variant="outlined"
          fullWidth
          margin="normal"
          name="condition"
          value={newAsset.condition}
          onChange={handleInputChange}
        />
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          margin="normal"
          name="location"
          value={newAsset.location}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddAsset} color="primary">
          Add Asset
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddAssetPopup;
