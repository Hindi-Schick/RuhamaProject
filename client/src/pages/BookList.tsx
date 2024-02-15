import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

type Book = {
  book_id: number;
  title: string;
  author: string;
  publisher_id: number;
  published_date: Date;
  price: number;
}

type Publisher = {
  publisher_id: number;
  name: string;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [publishers, setPublishers] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchPublishers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/publishers');
        const publisherMap: Record<number, string> = {};
        response.data.forEach((publisher: Publisher) => {
          publisherMap[publisher.publisher_id] = publisher.name;
        });
        setPublishers(publisherMap);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
    fetchPublishers();
  }, []);

  return (
    <div>
      <h2>Book List</h2>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid key={book.book_id} item xs={12} sm={6} md={3}>
            <Card sx={{ minWidth: 200, marginBottom: '16px', backgroundColor: '#f0f0f0' }}>
             <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {book.author}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Published on {new Date(book.published_date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Publisher: {publishers[book.publisher_id]}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: {book.price}
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
        Add Publisher
      </Button>
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
