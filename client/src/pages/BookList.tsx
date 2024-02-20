import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

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
  const [page, setPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const itemsPerPage = 9;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Book List</h2>
      <TextField
        label="Search Book"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <Grid container spacing={2}>
        {filteredBooks.slice(startIndex, endIndex).map((book) => (
          <Grid key={book.book_id} item xs={12} sm={6} md={4}>
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
      {filteredBooks.length > itemsPerPage && (
        <Stack spacing={2} sx={{ marginTop: '16px' }}>
          <Pagination count={Math.ceil(filteredBooks.length / itemsPerPage)} page={page} onChange={handleChange} />
        </Stack>
      )}
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
