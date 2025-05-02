import React, { useState, useEffect } from "react";
import MealTypeCard from "./MealTypeCard";
import "./Calender-CSS/MealTypeSelect.css";

export default function MealTypeSelect({ onSelect }) {
  const [mealTypes, setMealTypes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMealTypes();
  }, []);

  const fetchMealTypes = async () => {
    try {
      const response = await fetch(
        "https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/mealtype-899/v1.0/details"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch meal types");
      }
      const data = await response.json();
      setMealTypes(data);
    } catch (error) {
      setError(`Error fetching meal types: ${error.message}`);
    }
  };

  return (
    <div>
      <h3>Select a meal type</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="meal">
        {mealTypes.map((mealType) => (
          <MealTypeCard
            key={mealType.id}
            id={mealType.id}
            name={mealType.mealName}
            image={mealType.mealImageUrl}
            onSelect={() => onSelect(mealType.id, mealType.mealName)}
          />
        ))}
      </div>
    </div>
  );
}