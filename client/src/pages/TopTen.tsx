import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const TopTen: React.FC = () => {
  const [topBooks, setTopBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/top10');
        setTopBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopBooks();
  }, []);

  return (
    <div>
      <h2>Top 10 Books</h2>
      <Grid container spacing={2}>
        {topBooks.map((book) => (
          <Grid key={book.book_id} item xs={12} sm={6} md={3}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Author: {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Publisher: {book.publisher_id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Published on {new Date(book.published_date).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TopTen;
