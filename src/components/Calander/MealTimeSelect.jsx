import * as React from "react";
import MealTimeCard from "./MealTimeCard";
import "./css/MealTimeCard.css";

export default function MealTimeSelect({ selectedDate, onAddEvent }) {
  return (
    <div>
      <h3>Select A Meal Time</h3>
      <div className="meal">
        <MealTimeCard
          name="Breakfast"
          image="/breakfast.png"
          onSelect={(mealType) => onAddEvent("Breakfast", mealType)}  // Pass meal time and type to add event
        />
        <MealTimeCard
          name="Lunch"
          image="/lunch.png"
          onSelect={(mealType) => onAddEvent("Lunch", mealType)}
        />
        <MealTimeCard
          name="Dinner"
          image="/dinner.png"
          onSelect={(mealType) => onAddEvent("Dinner", mealType)}
        />
      </div>
    </div>
  );
}
