import { Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import { GenericCardProps } from '../utils/types';

const GenericCard: React.FC<GenericCardProps> = ({ title, details, actions, cardStyle }) => {
  return (
    <Card sx={{ minWidth: 200, marginBottom: '16px', backgroundColor: '#f0f0f0', ...cardStyle }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        {details.map((detail, index) => (
          <Typography key={index}>{detail}</Typography>
        ))}
      </CardContent>
      {actions && (
        <CardActions >
              {actions}
        </CardActions>
      )}
    </Card>
  );
};

export default GenericCard;
