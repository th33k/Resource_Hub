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
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AddMaintenancePopup = ({ open, onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("Low");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNameError(false);
    setDescriptionError(false);

    if (!name.trim()) {
      setNameError(true);
    }
    if (!description.trim()) {
      setDescriptionError(true);
    }

    if (!name.trim() || !description.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const userId = localStorage.getItem("Userid");
      if (!userId) {
        toast.error("User ID not found. Please login again.");
        return;
      }

      const payload = {
        name,
        priorityLevel,
        description,
        status: "Pending",
        user_id: parseInt(userId, 10),
      };

      const response = await axios.post(
        "http://localhost:9090/maintenance/add",
        payload
      );

      if (response.status === 200 || response.status === 202) {
        toast.success("Maintenance added successfully!");
        onAdd(response.data);
        window.location.reload(); // Refresh the window after adding maintenance
        onClose();
      } else {
        toast.error("Failed to add maintenance. Please try again.");
      }
    } catch (error) {
      console.error("Error adding maintenance:", error);

    } finally {
      setIsSubmitting(false);
      setName("");
      setPriorityLevel("Low");
      setDescription("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add New Maintenance</DialogTitle>
        <DialogContent>
          <div className="space-y-4 mt-2">
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              error={nameError}
              helperText={nameError ? "Please enter a name" : ""}
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
              label="Status"
              value="Pending"
              disabled
            />

            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              error={descriptionError}
              helperText={descriptionError ? "Please enter a description" : ""}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};