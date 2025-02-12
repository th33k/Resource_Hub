import { useState, useEffect } from 'react';
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MealCard from "../components/Meal/MealCard";
import { MealCardPopup } from '../components/Meal/AddMealTypePopup';
import './css/AddMealTime.css';

function AddMealTime() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [mealTimes, setMealTimes] = useState([]); 

  const title = "Add New Meal Time"; 
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


  useEffect(() => {
    const fetchMealTimes = async () => {
      try {
        const response = await fetch('http://localhost:8080/mealtime/allMeals');
        const data = await response.json();
        setMealTimes(data); 
      } catch (error) {
        console.error('Error fetching meal times:', error);
      }
    };

    fetchMealTimes();
  }, []); 

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
        New Meal Time
        <span className="addicon"><AddIcon /></span>
      </Button>

      {/* Meal Type Cards */}
      <div className="mealtimes">
        {mealTimes.length > 0 ? (
          mealTimes.map((meal) => (
            <MealCard 
              key={meal.id} 
              name={meal.meal_name} 
              image={meal.meal_image_url || '/default-meal.png'} 
            />
          ))
        ) : (
          <p>No meal times available</p>
        )}
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
