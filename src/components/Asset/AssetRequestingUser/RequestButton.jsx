import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import AssetSearch from "./AssetSearch";

function RequestButton({ open, onClose, onRequest }) {
  const [requestData, setRequestData] = useState({
    userName: "",
    assetName: "",
    assetId: "", // Added assetId to hold the asset ID
    category: "",
    quantity: "",
    handoverDate: new Date().toISOString().split("T")[0],
    reason: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("Username");
    if (storedUser) {
      setRequestData((prev) => ({ ...prev, userName: storedUser }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequestAsset = async () => {
    if (
      !requestData.userName ||
      !requestData.assetId || // Ensure assetId is provided and is a valid integer
      !requestData.quantity ||
      !requestData.reason
    ) {
      alert("Please fill in all fields");
      return;
    }
  
    // Get the user ID from localStorage
    const userId = localStorage.getItem("Userid");
    const assetId = requestData.assetId; // assetId should be an integer at this point
    const borrowedDate = new Date().toISOString().split("T")[0];  // Set current date as borrowed date
  
    const payload = {
      userid: parseInt(userId), // Ensure userId is an integer
      asset_id: parseInt(assetId), // Ensure assetId is an integer
      borrowed_date: borrowedDate,
      handover_date: requestData.handoverDate,
      quantity: parseInt(requestData.quantity), // Ensure quantity is an integer
    };
  
    try {
      const response = await fetch("https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/assetrequest-9fc/v1.0/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      if (response.ok) {
        
        onRequest(requestData); // Call onRequest if you need to do something with the data
        setRequestData({
          userName: "",
          assetName: "",
          assetId: "", // Reset assetId
          category: "",
          quantity: "",
          handoverDate: "",
          reason: "",
        });
        onClose();
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("Failed to submit request: " + error.message);
    }
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
          disabled
        />
        <AssetSearch
          value={requestData.assetName}
          onChange={handleInputChange}
          setAssetId={(assetId) => setRequestData((prev) => ({ ...prev, assetId }))}
        />
        <TextField
          label="Quantity"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          name="quantity"
          value={requestData.quantity}
          onChange={handleInputChange}
          inputProps={{ min: 0 }}
        />
        <TextField
          label="Handover Date"
          variant="outlined"
          fullWidth
          margin="normal"
          type="date"
          name="handoverDate"
          value={requestData.handoverDate}
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
