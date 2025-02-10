import { useState } from 'react';
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MealCard from "../components/Meal/MealCard";
import { MealCardPopup } from '../components/Meal/AddMealTypePopup';
import './css/AddMealTime.css';

function AddMealTime() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);


  const title = "Add New Meal Type"; 
  const value = 100; 
  const chartData = [10, 20, 30]; 


  const getSubtitle = () => {
    return "Manage meal times for the day"; 
  };


  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        className="addbtn"
        sx={{
          fontSize: '15px',
          padding: '10px 25px',
          margin: '10px',
          marginLeft: '20px'
        }}
        onClick={handlePopupOpen}
      >
        New Meal Type
        <span className="addicon"><AddIcon /></span>
      </Button>

      {/* Meal Time Cards */}
      <div className="mealtimes">
      <MealCard name="Veg" image="/veg.png"/>
          <MealCard name="Chicken" image="/chicken.png" />
          <MealCard name="Fish" image="/fish.png"  />
          <MealCard name="Veg" image="/veg.png"/>
          <MealCard name="Chicken" image="/chicken.png" />
          <MealCard name="Fish" image="/fish.png"  />
          <MealCard name="Veg" image="/veg.png"/>
          <MealCard name="Chicken" image="/chicken.png" />
          <MealCard name="Fish" image="/fish.png"  />
      </div>


      <MealCardPopup
        open={isPopupOpen}
        onClose={handlePopupClose}
        title={title}
        subtitle={getSubtitle()}
        value={value}
        chartData={chartData}
      />
    </div>
  );
}

export default AddMealTime;
