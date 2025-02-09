import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Popupmealtype from "./popupmealtype";  

const MealTimeCard = ({ name, image, onSelect, isDisabled }) => {
  const [popupOpen, setPopupOpen] = React.useState(false);
  
  const handleClick = () => {
    if (!isDisabled) {
      setPopupOpen(true);  
    }
  };

  return (
    <div>
      <Card
        sx={{
          width: 250,
          height: 300,
          padding: "20px",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardMedia sx={{ height: 200, width: 200 }} image={image} title={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "block", margin: "auto" }}>
          <Button 
            variant="contained" 
            onClick={handleClick}
            disabled={isDisabled} 
          >
            Select
          </Button>
        </CardActions>
      </Card>

      <Popupmealtype
        open={popupOpen}
        handleClose={() => setPopupOpen(false)}   
        onAddEvent={onSelect}   
      />
    </div>
  );
};

export default MealTimeCard;
