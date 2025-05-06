import React, { useState, useEffect } from "react";
import MealTimeCard from "./MealTimeCard";
import "./Calender-CSS/MealTimeSelect.css";
import { BASE_URLS } from '../../services/api/config';
import { toast } from "react-toastify";

export default function MealTimeSelect({ selectedDate, onAddEvent, isMealSelected }) {
  const [mealTimes, setMealTimes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMealTimes();
  }, []);

  const fetchMealTimes = async () => {
    try {
      const response = await fetch(`${BASE_URLS.mealtime}/details`);
      if (!response.ok) {
        throw new Error(`Failed to fetch meal times: ${response.status}`);
      }
      const data = await response.json();
      setMealTimes(data);
      toast.success("Meal times loaded successfully!");
    } catch (error) {
      console.error("Error fetching meal times:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h3>Select a meal time</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="meal">
        {mealTimes.map((mealtime) => (
          <MealTimeCard
            key={mealtime.mealtime_id}
            id={mealtime.mealtime_id}
            name={mealtime.mealtime_name}
            image={mealtime.mealImageUrl || "/default-mealtime.png"}
            onSelect={(mealTypeId, mealTypeName) =>
              onAddEvent(mealtime.mealtime_id, mealTypeId, mealtime.mealtime_name, mealTypeName)
            }
            isDisabled={isMealSelected(mealtime.mealtime_id)}
          />
        ))}
      </div>
    </div>
  );
}