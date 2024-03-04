import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { PlusOne } from '@mui/icons-material';
import { GridDeleteIcon } from '@mui/x-data-grid';
import { Book, Props, Publisher, Reader } from '../utils/types';
import { Button, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const GenericCard: React.FC<Props> = ({ data, type, handleDeleteDialogOpen, handleOpen }) => {
  return (
    <Card sx={{ minWidth: 200, marginBottom: '16px', backgroundColor: '#f0f0f0' }}>
      <CardContent>
        {type === 'book' && (
          <>
            <Typography variant="h6">{(data as Book).title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {(data as Book).author}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Published on {new Date((data as Book).published_date).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Publisher: {(data as Book).publisher?.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Price: {(data as Book).price}
            </Typography>
            <IconButton onClick={() => handleOpen(data as Book)} color="primary" aria-label="add copy">
              <PlusOne />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => handleDeleteDialogOpen((data as Book).book_id)}>
              <GridDeleteIcon />
            </IconButton>
          </>
        )}
        {(type === 'reader' || type === 'overduReader') && (
          <>
            <Typography variant="h6">{(data as Reader).name}</Typography>
            <Typography variant="body2" color="textSecondary"> {(data as Reader).email}</Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: {(data as Reader).phone}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Address: {(data as Reader).address}
            </Typography>
            <CardActions>
              <Button size="small" component={Link} to={`/reader/${(data as Reader).reader_id}/borrowedBooks`}>
                View Borrowed Books
              </Button>
              {!(data as Reader).deleted_at && type === 'reader' && (
                <IconButton aria-label="delete" onClick={() => handleDeleteDialogOpen((data as Reader).reader_id)}>
                  <GridDeleteIcon />
                </IconButton>
              )}
            </CardActions>
          </>
        )}
        {type === 'publisher' && (
          <>
            <Typography variant="h6">{(data as Publisher).name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {(data as Publisher).location}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Total Payment: ₪{(data as Publisher).totalPayment}
            </Typography>
            <IconButton aria-label="delete" onClick={() => handleDeleteDialogOpen((data as Publisher).publisher_id)} >
              <GridDeleteIcon />
            </IconButton>
          </>
        )}
      </CardContent>
    </Card>
  );
};


export default GenericCard;
