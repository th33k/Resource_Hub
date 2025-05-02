import React, { useState, useEffect } from "react";
import MealTimeCard from "./MealTimeCard";
import "./Calender-CSS/MealTimeSelect.css";

export default function MealTimeSelect({ selectedDate, onAddEvent, isMealSelected }) {
  const [mealTimes, setMealTimes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMealTimes();
  }, []);

  const fetchMealTimes = async () => {
    try {
      const response = await fetch(
        "https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/mealtime-481/v1.0/details"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch meal times");
      }
      const data = await response.json();
      setMealTimes(data);
    } catch (error) {
      setError(`Error fetching meal times: ${error.message}`);
    }
  };

  return (
    <div>
      <h3>Select a meal time</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="meal">
        {mealTimes.map((mealtime) => (
          <MealTimeCard
            key={mealtime.id}
            id={mealtime.id}
            name={mealtime.mealName}
            image={mealtime.mealImageUrl || "/default-mealtime.png"}
            onSelect={(mealTypeId, mealTypeName) =>
              onAddEvent(mealtime.id, mealTypeId, mealtime.mealName, mealTypeName)
            }
            isDisabled={isMealSelected(mealtime.id)}
          />
        ))}
      </div>
    </div>
  );
}