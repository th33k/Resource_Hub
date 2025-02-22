import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

function DeleteAssetPopup({ open, asset, onClose, onDelete }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Asset</DialogTitle>
      <DialogContent>
        Are you sure you want to delete <strong>{asset.name}</strong>?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={() => onDelete(asset.id)} color="error">Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteAssetPopup;
