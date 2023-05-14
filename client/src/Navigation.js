import React from 'react';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';

const Navigation = ({ onLike, onDislike }) => {
  return (
    <div>
      <IconButton onClick={onDislike} color="secondary">
        <CloseIcon fontSize="large" />
      </IconButton>
      <IconButton onClick={onLike} color="primary">
        <FavoriteIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default Navigation;
