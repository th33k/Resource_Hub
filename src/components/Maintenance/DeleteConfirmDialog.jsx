import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { AlertTriangle } from 'lucide-react';

export const DeleteConfirmDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle className="flex items-center gap-2 text-red-600">
        <AlertTriangle />
        Confirm Deletion
      </DialogTitle>
      <DialogContent>
        Are you sure you want to delete this maintenance? <br />
        This action cannot be undone.
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={() => { onConfirm(); window.location.reload(); }}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
