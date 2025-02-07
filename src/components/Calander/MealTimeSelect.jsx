import * as React from 'react';
import MealTimeCard from "./MealTimeCard";
import "./css/MealTimeCard.css";

export default function MealTimeSelect() {
    return (
        <div>
            <h3>Select A Meal Time</h3>
            <div className='meal'>

                <MealTimeCard name="Breakfast" image="/breakfast.png" />
                <MealTimeCard name="Lunch" image="/lunch.png" />
                <MealTimeCard name="Dinner" image="/dinner.png" />
            </div>
        </div>
    );
}
