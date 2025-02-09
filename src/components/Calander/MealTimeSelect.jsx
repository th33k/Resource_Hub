import * as React from "react";
import MealTimeCard from "./MealTimeCard";
import "./css/MealTimeCard.css";

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
          name="Lunch"
          image="/lunch.png"
          onSelect={(mealType) => onAddEvent("Lunch", mealType)}
          isDisabled={isMealSelected("Lunch")} 
        />
        <MealTimeCard
          name="Dinner"
          image="/dinner.png"
          onSelect={(mealType) => onAddEvent("Dinner", mealType)}
          isDisabled={isMealSelected("Dinner")}  
        />
      </div>
    </div>
  );
}
