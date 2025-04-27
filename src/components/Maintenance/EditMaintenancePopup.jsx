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
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

export const EditMaintenance = ({ maintenance, open, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [requestDate, setRequestDate] = useState("");

  useEffect(() => {
    if (maintenance) {
      setName(maintenance.name || "");
      setPriorityLevel(maintenance.priorityLevel || "");
      setDescription(maintenance.description || "");
      setStatus(maintenance.status || "");
      setRequestDate(maintenance.request_date || "");
    }
  }, [maintenance]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedMaintenanceData = {
      ...maintenance,
      name,
      priorityLevel,
      description,
      status,
      request_date: requestDate,
    };

    try {
      const response = await axios.put(
        `http://localhost:9090/maintenance/details/${maintenance.id}`,
        updatedMaintenanceData
      );

      onSave(response.data);
      window.location.reload(); // Refresh the window after saving
      onClose(); // Close the dialog after successfully saving
    } catch (error) {
      console.error("Failed to update maintenance:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Edit Maintenance</DialogTitle>
        <DialogContent>
          <div className="space-y-4 mt-2">
            <TextField
              fullWidth
              label="Name"
              value={name}
              disabled
              required
            />

            <TextField
              fullWidth
              label="Request Date"
              value={requestDate}
              disabled
              required
            />

            <FormControl fullWidth>
              <InputLabel>Priority Level</InputLabel>
              <Select
                value={priorityLevel}
                label="Priority Level"
                onChange={(e) => setPriorityLevel(e.target.value)}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
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