import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button"; // Button component for the actions
import Typography from "@mui/material/Typography"; // Typography for the title/description

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "25%",
  height: "30%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "hidden",
  p: 4,
};

function DeletePopup({ open, handleClose, onDelete, eventTitle }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      BackdropProps={{
        style: {
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        },
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography sx={{textAlign:'center'}} variant="h6" component="h2">
          Delete Event
        </Typography>
        <Typography  variant="body1" sx={{ mt: 1,textAlign:'center' }}>
          Are you sure you want to delete the event:<br></br> <strong>{eventTitle}</strong>?
        </Typography>
        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-evenly" ,alignItems:'center',textAlign:'center'}}>
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
