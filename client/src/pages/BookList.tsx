import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import { PlusOne } from '@mui/icons-material';

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
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [numCopies, setNumCopies] = useState(1);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

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

  useEffect(() => {
    fetchBooks();
    fetchPublishers();
  }, []);

  const handleOpen = (book: Book) => {
    setSelectedBook(book);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNumCopies(1); 
  };

  const handleSave = async () => {
    setOpen(false);
    await addCopy();
    fetchBooks(); 
  };

  const addCopy = async () => {
    try {
      await axios.post(`http://localhost:8080/api/copyOfBook`, {
        title: selectedBook?.title,
        is_borrowed: false,
        book_id: selectedBook?.book_id
      });
    } catch (error) {
      console.error(error);
    }
  };

  const itemsPerPage = 6;
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
                <IconButton onClick={() => handleOpen(book)} color="primary" aria-label="add copy">
                  <PlusOne />
                </IconButton>
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
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <Typography variant="h6">Add Copies</Typography>
          <Typography variant="body1">Are you sure you want to add a copy of {selectedBook?.title}?</Typography>
          <Button variant="contained" onClick={handleSave} color="primary" style={{ marginRight: '8px' }}>
            Save
          </Button>
          <Button variant="contained" onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default BookList;

