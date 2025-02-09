import NewMealTypeCard from "../components/Meal/MealTypeCard";
import { Button } from "@mui/material";
import '../css/AddMealType.css'
import AddIcon from '@mui/icons-material/Add';

function AddMealType(){
    return(
        <div>
<Button variant="contained" className='addbtn' sx={{
        fontSize:'15px',
        padding:'10px 25px',
        margin:'10px',
        marginLeft:'20px'
      }}>
        New Meal Type
        <span className='addicon'><AddIcon /></span>
      </Button>
        <div className="mealtimes">
          <NewMealTypeCard name="Veg" image="/veg.png"/>
          <NewMealTypeCard name="Chicken" image="/chicken.png" />
          <NewMealTypeCard name="Fish" image="/fish.png"  />
          <NewMealTypeCard name="Veg" image="/veg.png"/>
          <NewMealTypeCard name="Chicken" image="/chicken.png" />
          <NewMealTypeCard name="Fish" image="/fish.png"  />
          <NewMealTypeCard name="Veg" image="/veg.png"/>
          <NewMealTypeCard name="Chicken" image="/chicken.png" />
          <NewMealTypeCard name="Fish" image="/fish.png"  />
        </div>
      </div>
    )
}

export default AddMealType