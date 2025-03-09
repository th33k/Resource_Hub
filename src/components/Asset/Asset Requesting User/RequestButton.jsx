import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

function RequestButton({ open, onClose, onRequest }) {
  const [requestData, setRequestData] = useState({
    userName: "",
    assetName: "",
    category: "",
    quantity: "",
    reason: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequestAsset = () => {
    if (!requestData.userName || !requestData.assetName || !requestData.category || !requestData.quantity || !requestData.reason) {
      alert("Please fill in all fields");
      return;
    }
    onRequest(requestData); 
    setRequestData({
      userName: "",
      assetName: "",
      category: "",
      quantity: "",
      reason: "",
    });
    onClose(); 
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Request an Asset</DialogTitle>
      <DialogContent>
        <TextField
          label="Your Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="userName"
          value={requestData.userName}
          onChange={handleInputChange}
        />
        <TextField
          label="Asset Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="assetName"
          value={requestData.assetName}
          onChange={handleInputChange}
        />
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={requestData.category}
            onChange={handleInputChange}
            label="Category"
          >
            <MenuItem value="Electronics & IT">Electronics & IT</MenuItem>
            <MenuItem value="Stationery">Stationery</MenuItem>
            <MenuItem value="Furniture">Furniture</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Quantity"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          name="quantity"
          value={requestData.quantity}
          onChange={handleInputChange}
        />
        <TextField
          label="Reason for Request"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          name="reason"
          value={requestData.reason}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleRequestAsset} color="primary">
          Submit Request
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RequestButton;
