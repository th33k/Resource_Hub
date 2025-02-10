import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import '../css/Meal/MealCard.css'
function MealCard({ name, image }) {
        return (
            <div>
                <Card className="mealtime-card">
                    <CardMedia className="mealtime-card-media" image={image} title={name} />
                    <CardContent className="mealtime-card-content">
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                    </CardContent>
                    <CardActions className="mealtime-card-actions">
                        <Button variant="outlined" className="mealtime-card-button">
                            Edit<ModeEditTwoToneIcon />
                        </Button>
                        <Button variant="outlined" color="error" className="mealtime-card-button">
                            Delete <DeleteTwoToneIcon />
                        </Button>
                    </CardActions>
                </Card>
            </div>
        )
    }

export default MealCard