import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

type Reader = {
  reader_id: number;
  name: string;
  email: string;
  phone: number;
  address: string;
  borrowedBooks: Borrowing[];
}

type Borrowing = {
  borrowing_id: number;
  copy_book_id: number;
  reader_id: number;
  book_id: number;
  borrow_date: Date;
  return_date: Date | null;
}

const ReaderList: React.FC = () => {
  const [readers, setReaders] = useState<Reader[]>([]);

  useEffect(() => {
    const fetchReaders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/readers');
        setReaders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReaders();
  }, []);

  return (
    <div>
      <h2>Reader List</h2>
      <Grid container spacing={2}>
        {readers.map((reader) => (
          <Grid key={reader.reader_id} item xs={12} sm={6} md={3}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {reader.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {reader.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Phone: {reader.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Address: {reader.address}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/reader/${reader.reader_id}/borrowed-books`}>
                  View Borrowed Books
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button
        component={Link}
        to="/reader"
        variant="contained"
        color="primary"
        style={{ margin: '16px' }}
      >
        Add New Reader
      </Button>
    </div>
  );
};

export default ReaderList;
