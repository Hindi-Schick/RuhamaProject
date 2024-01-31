import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

interface Book {
  book_id: number;
  title: string;
  author: string;
  publisher_id: number;
  publisher_name: string;
  published_date: Date;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Book List</h2>
      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid key={book.book_id} item xs={12} sm={6} md={3}>
            <Card style={{ marginBottom: '16px', backgroundColor: '#f0f0f0' }}>
              <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {book.author}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Published on {new Date(book.published_date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Publisher: {book.publisher_name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
          <Button
        component={Link}
        to="/publisher"  
        variant="contained"
        color="primary"
        style={{ margin: '16px' }}
      >
        Add Pablisher
      </Button>
      {/* Button to navigate to the page for adding a new book */}
      <Button
        component={Link}
        to="/addBook"  
        variant="contained"
        color="primary"
        style={{ margin: '16px' }}
      >
        Add New Book
      </Button>
    </div>
  );
};

export default BookList;
