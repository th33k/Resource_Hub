import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MealTypeSelect from "./MealTypeSelect";
import '../css/Calender/PopupMealType.css';

function Popupmealtype({ open, handleClose, onAddEvent }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      BackdropProps={{
        className: "popup-backdrop2",
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className="popup-box2" sx={{overflowY: "auto"}}
      >
        <MealTypeSelect onSelect={(mealTypeId) => onAddEvent(mealTypeId)} />
      </Box>
    </Modal>
  );
}

export default Popupmealtype;
