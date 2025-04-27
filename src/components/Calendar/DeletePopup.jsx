import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography"; 
import './Calender-CSS/DeletePopup.css';  

function DeletePopup({ open, handleClose, onDelete, eventTitle }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      BackdropProps={{
        className: "modal-backdrop",
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-box">
        <Typography className="modal-title" variant="h6" component="h2">
          Delete Event
        </Typography>
        <Typography className="modal-description" variant="body1">
          Are you sure you want to delete the event:<br /> <strong>{eventTitle}</strong>?
        </Typography>
        <Box className="modal-actions">
          <Button variant="contained" color="error" onClick={onDelete}>
            Delete
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default DeletePopup;
