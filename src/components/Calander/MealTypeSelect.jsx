import * as React from "react";
import MealTypeCard from "./MealTypeCard";  

export default function MealTypeSelect({ onSelect }) {
  return (
    <div>
      <h3>Select A Meal Type</h3>
      <div className="meal">
        <MealTypeCard name="Veg" image="/veg.png" onSelect={onSelect} />
        <MealTypeCard name="Chicken" image="/chicken.png" onSelect={onSelect} />
        <MealTypeCard name="Fish" image="/fish.png" onSelect={onSelect} />
      </div>
    </div>
  );
}
