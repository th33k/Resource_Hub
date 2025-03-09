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
import { useState } from 'react';

export const AddMainterancePopup = ({ open, onClose, onAdd }) => {
  const [name, setname] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('1');
  const [description, setDescription] = useState('');
  const [nameError, setnameError] = useState(false);
  const [status, setStatus] = useState("Pending");



  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      name,
      priorityLevel,
      description,
      profilePicture: `https://ui-avatars.com/api/?name=${name.split('@')[0]}`,
      status
    });

    setname('');
    setPriorityLevel('User');
    setDescription('');
    setnameError(false);
    setStatus("Pending");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add New Miantenance</DialogTitle>
        <DialogContent>
          <div className="space-y-4 mt-2">


            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
              error={nameError}
              helperText={nameError ? "Please enter name" : ""}
            />



            <FormControl fullWidth>
              <InputLabel>Priority Level</InputLabel>
              <Select
                value={priorityLevel}
                label="Priority Level"
                onChange={(e) => setPriorityLevel(e.target.value)}
              >
                {/* values Admin User */}
                <MenuItem value="1">1</MenuItem>  
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                {/* values Admin User */}
                <MenuItem value="Pending">Pending</MenuItem>  
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
               
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
          <Button type="submit" variant="contained">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};


