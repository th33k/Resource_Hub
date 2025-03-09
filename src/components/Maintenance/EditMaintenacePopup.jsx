import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useState, useEffect } from 'react';

export const EditMaintanence = ({ user, open, onClose, onSave }) => {
  const [name, setname] = useState(user.name);
  const [priorityLevel, setPriorityLevel] = useState(user.priorityLevel);
  const [description, setDescription] = useState(user.description);

  useEffect(() => {
    setname(user.name);
    setPriorityLevel(user.priorityLevel);
    setDescription(user.description);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...user,
      name,
      priorityLevel,
      description,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Edit Maintenance</DialogTitle>
        <DialogContent>
          <div className="space-y-4 mt-2">
            <TextField
              fullWidth
              label="name"
              value={name}
              disabled
              required
              helperText="name cannot be changed"
            />
            <FormControl fullWidth>
              <InputLabel>Priority Level</InputLabel>
              <Select
                value={priorityLevel}
                label="User Type"
                onChange={(e) => setPriorityLevel(e.target.value)}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
