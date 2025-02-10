import * as React from "react";
import MealTypeCard from "./MealTypeCard";  
import '../css/Calender/MealTypeSelect.css';  // Import the CSS file

export default function MealTypeSelect({ onSelect }) {
  return (
    <div>
      <h3>Select A Meal Type</h3>
      <div className="meal">
        <MealTypeCard name="Veg" image="/veg.png" onSelect={onSelect} />
        <MealTypeCard name="Chicken" image="/chicken.png" onSelect={onSelect} />
        <MealTypeCard name="Fish" image="/fish.png" onSelect={onSelect} />
        <MealTypeCard name="Beef" image="/beef.png" onSelect={onSelect} />
        <MealTypeCard name="Pork" image="/pork.png" onSelect={onSelect} />
        <MealTypeCard name="Mutton" image="/mutton.png" onSelect={onSelect} />
        <MealTypeCard name="Vegan" image="/vegan.png" onSelect={onSelect} />
        <MealTypeCard name="Seafood" image="/seafood.png" onSelect={onSelect} />
      </div>
    </div>
  );
}
