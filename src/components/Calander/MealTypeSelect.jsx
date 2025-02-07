import * as React from 'react';
import MealTypeCard from "./MealTypeCard";
import "./css/MealTimeCard.css"

export default function MealTypeSelect() {
    return (
        <div>
            <h3>Select A Meal Time</h3>
            <div className='meal'>
                <MealTypeCard name="Veg" image="/veg.png" />
                <MealTypeCard name="Chicken" image="/chicken.png" />
                <MealTypeCard name="Fish" image="/fish.png" />
            </div>
        </div>
    );
}
