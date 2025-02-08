import NewMealTimeCard from "../components/Meal/NewNewMealTimeCard";
import { Button } from "@mui/material";

function AddMealTime(){
    return(
        <div>
        <Button variant="contained">Add New Meal TIme</Button>
        <div className="meal">
          <NewMealTimeCard name="Breakfast" image="/breakfast.png"/>
          <NewMealTimeCard name="Lunch" image="/lunch.png" />
          <NewMealTimeCard name="Dinner" image="/dinner.png"  />
        </div>
      </div>
    )
}

export default AddMealTime