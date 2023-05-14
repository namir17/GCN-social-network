import React from 'react';
import { Card as MuiCard, CardContent, CardMedia, Typography } from '@mui/material';

const Card = ({ name, age, imageUrl, bio }) => {
  return (
    <MuiCard>
      <CardMedia
        component="img"
        height="300"
        image={imageUrl}
        alt={name}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {name}, {age}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {bio}
        </Typography>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
