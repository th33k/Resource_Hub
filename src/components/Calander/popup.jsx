import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MealTimeSelect from "./MealTimeSelect";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "hidden",
  p: 4,
};

function Popup({ open, handleClose, selectedDate, onAddEvent, isMealSelected }) {
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
        <MealTimeSelect
          selectedDate={selectedDate}
          onAddEvent={onAddEvent}   
          isMealSelected={isMealSelected}  
        />
      </Box>
    </Modal>
  );
}

export default Popup;
