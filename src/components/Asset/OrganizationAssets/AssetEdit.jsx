import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

function EditAssetPopup({ open, asset, onClose, onUpdate }) {
  const [editedAsset, setEditedAsset] = useState({
    id: "",
    name: "",
    category: "",
    quantity: "",
    condition: "",
    location: "",
  });

  useEffect(() => {
    if (asset) {
      setEditedAsset({
        id: asset.id,
        name: asset.asset_name,
        category: asset.category,
        quantity: asset.quantity,
        condition: asset.condition_type,
        location: asset.location,
      });
    }
  }, [asset]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAsset((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (
      !editedAsset.name ||
      !editedAsset.category ||
      !editedAsset.quantity ||
      !editedAsset.condition ||
      !editedAsset.location
    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(
        `https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/asset-e99/v1.0/details/${editedAsset.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editedAsset.id,
            asset_name: editedAsset.name,
            category: editedAsset.category,
            quantity: parseInt(editedAsset.quantity),
            condition_type: editedAsset.condition,
            location: editedAsset.location,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedAsset = await response.json();
      onUpdate(updatedAsset);
      onClose();
    } catch (error) {
      console.error("Error updating asset:", error);
      alert("Failed to update asset.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Asset</DialogTitle>
      <DialogContent>
        <TextField
          label="Asset Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={editedAsset.name}
          onChange={handleInputChange}
        />
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={editedAsset.category}
            onChange={handleInputChange}
            label="Category"
          >
            <MenuItem value="Electronics & IT">IT Equipment</MenuItem>
            <MenuItem value="Office Supplies">Office Supplies</MenuItem>
            <MenuItem value="Furniture">Furniture</MenuItem>
            <MenuItem value="Electrical Appliances">Electrical Appliances</MenuItem>
            <MenuItem value="Machinery & Tools">Machinery & Tools</MenuItem>
            <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Quantity"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          name="quantity"
          value={editedAsset.quantity}
          onChange={handleInputChange}
        />
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Condition</InputLabel>
          <Select
            name="condition"
            value={editedAsset.condition}
            onChange={handleInputChange}
            label="Condition"
          >
            <MenuItem value="Brand New">Brand New</MenuItem>
            <MenuItem value="Used">Used</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          margin="normal"
          name="location"
          value={editedAsset.location}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update Asset
        </Button>
        
      </DialogActions>
    </Dialog>
  );
}

export default EditAssetPopup;
