import { useState, useEffect } from 'react';
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MealCard from "../components/Meal/MealCard";
import { MealCardPopup } from '../components/Meal/AddMealTypePopup';
import './css/AddMealTime.css';

function AddMealTime() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [mealTypes, setMealTypes] = useState([]); // State to store meal types fetched from API

  const title = "Add New Meal Type"; 
  const value = 100; 
  const chartData = [10, 20, 30]; 

  const getSubtitle = () => {
    return "Manage meal types for the day"; 
  };

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  // Fetch meal types from the API
  useEffect(() => {
    const fetchMealTypes = async () => {
      try {
        const response = await fetch('http://localhost:8081/mealtype/allMealTypes');
        const data = await response.json();
        setMealTypes(data); // Update the state with the fetched data
      } catch (error) {
        console.error('Error fetching meal types:', error);
      }
    };

    fetchMealTypes();
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
        New Meal Type
        <span className="addicon"><AddIcon /></span>
      </Button>

      {/* Meal Type Cards */}
      <div className="mealtimes">
        {mealTypes.length > 0 ? (
          mealTypes.map((meal) => (
            <MealCard 
              key={meal.id} 
              name={meal.meal_name} 
              image={meal.meal_image_url || '/default-meal.png'} 
            />
          ))
        ) : (
          <p>No meal types available</p>
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
