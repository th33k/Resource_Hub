import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

function DeletePopup({ open, onClose, onDelete, mealId }) {
    const [error, setError] = useState(null);

    const handleDelete = async () => {
      try {
        const response = await fetch(`http://localhost:9092/mealtype/${mealId}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          onDelete(mealId);
          onClose();
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to delete meal type");
        }
      } catch (error) {
        setError(`Error deleting meal type: ${error.message}`);
      }
    };
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        {error && <p style={{ color: "red", padding: "0 16px" }}>{error}</p>}
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
}

export default DeletePopup;
