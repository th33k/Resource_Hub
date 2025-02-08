import NewMealTimeCard from "../components/Meal/MealTimeCard";
import { Button } from "@mui/material";
import '../css/AddMealTime.css'
import AddIcon from '@mui/icons-material/Add';

function AddMealTime(){
    return(
        <div>
<Button variant="contained" className='addbtn' sx={{
        fontSize:'15px',
        padding:'10px 25px',
        margin:'10px',
        marginLeft:'20px'
      }}>
        New Meal Time
        <span className='addicon'><AddIcon /></span>
      </Button>
        <div className="mealtimes">
        <NewMealTimeCard name="Breakfast" image="/breakfast.png" />
        <NewMealTimeCard name="Lunch" image="/lunch.png" />
        <NewMealTimeCard name="Dinner" image="/dinner.png" />
        <NewMealTimeCard name="Breakfast" image="/breakfast.png" />
        <NewMealTimeCard name="Lunch" image="/lunch.png" />
        <NewMealTimeCard name="Dinner" image="/dinner.png" />
        <NewMealTimeCard name="Breakfast" image="/breakfast.png" />
        <NewMealTimeCard name="Lunch" image="/lunch.png" />
        <NewMealTimeCard name="Dinner" image="/dinner.png" />
        </div>
      </div>
    )
}

export default AddMealTime