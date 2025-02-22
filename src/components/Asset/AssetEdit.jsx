import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

function EditAssetPopup({ open, asset, onClose, onUpdate }) {
  const [updatedAsset, setUpdatedAsset] = useState(asset);

  // Handle Input Change
  const handleChange = (e) => {
    setUpdatedAsset({ ...updatedAsset, [e.target.name]: e.target.value });
  };

  // Save Changes
  const handleSave = () => {
    onUpdate(updatedAsset);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Asset</DialogTitle>
      <DialogContent>
        <TextField
          label="Asset Name"
          name="name"
          fullWidth
          value={updatedAsset.name}
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          fullWidth
          value={updatedAsset.quantity}
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          label="Condition"
          name="condition"
          fullWidth
          value={updatedAsset.condition}
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          label="Location"
          name="location"
          fullWidth
          value={updatedAsset.location}
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
