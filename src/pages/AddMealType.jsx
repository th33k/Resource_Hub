import NewMealTypeCard from "../components/Meal/MealTypeCard";
import { Button } from "@mui/material";

function AddMealType(){
    return(
        <div>
        <Button variant="contained">
          Add New Meal Type
          <span></span>
        </Button>
        <div className="meal">
          <NewMealTypeCard name="Veg" image="/veg.png"/>
          <NewMealTypeCard name="Chicken" image="/chicken.png" />
          <NewMealTypeCard name="Fish" image="/fish.png"  />
        </div>
      </div>
    )
}

export default AddMealType