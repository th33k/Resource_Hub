import * as React from "react";
import MealTimeCard from "./MealTimeCard";
import '../css/Calender/MealTimeSelect.css';  // Import the CSS file

export default function MealTimeSelect({ selectedDate, onAddEvent, isMealSelected }) {
  return (
    <div>
      <h3>Select A Meal Time</h3>
      <div className="meal">
        <MealTimeCard
          name="Breakfast"  
          image="/breakfast.png"
          onSelect={(mealType) => onAddEvent("Breakfast", mealType)}  
          isDisabled={isMealSelected("Breakfast")}  
        />
        <MealTimeCard
          name="Brunch"  
          image="/brunch.png"
          onSelect={(mealType) => onAddEvent("Brunch", mealType)}  
          isDisabled={isMealSelected("Brunch")}  
        />
        <MealTimeCard
          name="Lunch" 
          image="/lunch.png"
          onSelect={(mealType) => onAddEvent("Lunch", mealType)}
          isDisabled={isMealSelected("Lunch")} 
        />
        <MealTimeCard
          name="Afternoon Snack"  
          image="/snack.png"
          onSelect={(mealType) => onAddEvent("Afternoon Snack", mealType)}  
          isDisabled={isMealSelected("Afternoon Snack")}  
        />
        <MealTimeCard
          name="Dinner" 
          image="/dinner.png"
          onSelect={(mealType) => onAddEvent("Dinner", mealType)}
          isDisabled={isMealSelected("Dinner")}  
        />
        <MealTimeCard
          name="Late Night Snack"  
          image="/late-night-snack.png"
          onSelect={(mealType) => onAddEvent("Late Night Snack", mealType)}  
          isDisabled={isMealSelected("Late Night Snack")}  
        />
      </div>
    </div>
  );
}
