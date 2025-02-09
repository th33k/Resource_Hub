import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

function NewMealTimeCard({ name, image }) {
    return (
        <div>
            <Card
                sx={{
                    width: 250,
                    height: 300,
                    padding: "20px",
                    maxWidth: 400,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CardMedia sx={{ height: 200, width: 200 }} image={image} title={name} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: "block", margin: "auto" }}>
                    <Button variant="outlined" sx={{
                        width:'90px'
                    }}>
                        Edit<ModeEditTwoToneIcon/>
                        </Button>
                    <Button variant="outlined" color="error" sx={{
                        width:'90px',
                    }}>
                        Delete <DeleteTwoToneIcon/>
                        </Button>
                </CardActions>
            </Card>

        </div>
    )
}

export default NewMealTimeCard