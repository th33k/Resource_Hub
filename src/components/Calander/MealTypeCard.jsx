import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function MealTimeCard({ name, image, onSelect }) {
    
  return (
    <Card sx={{ width: 250, height: 300, padding: '20px', maxWidth: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <CardMedia
        sx={{ height: 200, width: 200 }}
        image={image}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'block', margin: 'auto' }}>
        <Button variant="contained" onClick={onSelect}>Request</Button>
      </CardActions>
    </Card>
  );
}

export default MealTimeCard;