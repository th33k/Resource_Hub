import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditPopup from './EditMealTypePopup';
import DeletePopup from './DeleteMealTypePopup';
import "../css/Meal/MealCard.css";

function MealCard({ mealId, name, image, onEdit, onDelete }) {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [mealName, setMealName] = React.useState(name);
  const [mealImage, setMealImage] = React.useState(image);
  const [error, setError] = React.useState(null);

  const handleEditClickOpen = () => {
    setOpenEdit(true);
    setError(null);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setError(null);
  };

  const handleDeleteClickOpen = () => {
    setOpenDelete(true);
    setError(null);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
    setError(null);
  };

  const handleSaveEdit = async (mealId, name, image) => {
    try {
      const response = await fetch(`http://localhost:9090/mealtype/details/${mealId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mealName: name, mealImageUrl: image }),
      });

      if (!response.ok) {
        throw new Error('Failed to update meal');
      }

      const data = await response.json();
      setMealName(name);
      setMealImage(image);
      setOpenEdit(false);
    } catch (error) {
      setError(`Error updating meal: ${error.message}`);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await onDelete(mealId);
      setOpenDelete(false);
    } catch (error) {
      setError(`Error deleting meal: ${error.message}`);
    }
  };

  return (
    <div>
      <Card className="mealtime-card">
        <CardMedia className="mealtime-card-media" image={mealImage} title={mealName} />
        <CardContent className="mealtime-card-content">
          <Typography gutterBottom variant="h5" component="div">
            {mealName}
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
        </CardContent>
        <CardActions className="mealtime-card-actions">
          <Button variant="outlined" className="mealtime-card-button" onClick={handleEditClickOpen}>
            Edit <ModeEditTwoToneIcon />
          </Button>
          <Button variant="outlined" color="error" className="mealtime-card-button" onClick={handleDeleteClickOpen}>
            Delete <DeleteTwoToneIcon />
          </Button>
        </CardActions>
      </Card>

      <EditPopup
        open={openEdit}
        onClose={handleEditClose}
        onSave={handleSaveEdit}
        mealName={mealName}
        mealImage={mealImage}
        setMealName={setMealName}
        setMealImage={setMealImage}
        mealId={mealId}
      />

      <DeletePopup
        open={openDelete}
        onClose={handleDeleteClose}
        onDelete={handleConfirmDelete}
        mealId={mealId}
      />
    </div>
  );
}

export default MealCard;
