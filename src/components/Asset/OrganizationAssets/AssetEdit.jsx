import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import axios from "axios";

function EditAssetPopup({ open, asset, onClose, onUpdate }) {
  const [updatedAsset, setUpdatedAsset] = useState(asset);

  useEffect(() => {
    setUpdatedAsset(asset); // Ensure dialog is updated when a new asset is selected
  }, [asset]);

  const handleChange = (e) => {
    setUpdatedAsset({ ...updatedAsset, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:9090/asset/details/${updatedAsset.id}`,
        updatedAsset
      );
      onUpdate(response.data); // Use updated data returned by backend
    } catch (error) {
      console.error("Failed to update asset:", error);
      alert("Failed to update asset");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Asset</DialogTitle>
      <DialogContent>
        <TextField
          label="Asset Name"
          name="name"
          fullWidth
          value={updatedAsset.name || ""}
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          fullWidth
          value={updatedAsset.quantity || ""}
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          label="Condition"
          name="condition"
          fullWidth
          value={updatedAsset.condition || ""}
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          label="Location"
          name="location"
          fullWidth
          value={updatedAsset.location || ""}
          onChange={handleChange}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditAssetPopup;
