import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MealTypeSelect from "./MealTypeSelect";  

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "hidden",
  p: 4,
};

function Popupmealtype({ open, handleClose, onAddEvent }) {
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

        <MealTypeSelect onSelect={(mealType) => onAddEvent(mealType)} />
      </Box>
    </Modal>
  );
}

export default Popupmealtype;
