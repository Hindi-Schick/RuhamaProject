import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../api/book.api';
import GenericCard from '../components/GenericCard';
import { Book } from '../utils/types';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [numCopies, setNumCopies] = useState(1);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookIdToDelete, setBookIdToDelete] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState(false);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const fetchData = async () => {
    try {
      const fetchedBooks = await fetchBooks();
      fetchedBooks.sort((a: { title: string; }, b: { title: any; }) => a.title.localeCompare(b.title));
      setBooks(fetchedBooks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
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
        is_borrowed: false,
        book_id: selectedBook?.book_id
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteDialogOpen = (bookId: number) => {
    setBookIdToDelete(bookId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setBookIdToDelete(null);
  };

  const handleDelete = async (bookId: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/book/${bookId}`);
      fetchData();
      handleDeleteDialogClose();
      setDeleteError(false);
    } catch (error) {
      console.error(error);
      setDeleteError(true);
      handleDeleteDialogClose();
    } finally {
      setTimeout(() => setDeleteError(false), 3000);
    }
  };

  const itemsPerPage = 6;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredBooks = books.filter(book =>
    (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
    !book.deleted_at
  );


  return (
    <>
      <Typography variant="h4">Book List</Typography>
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
            <GenericCard data={book} handleOpen={handleOpen} handleDeleteDialogOpen={handleDeleteDialogOpen} type={"book"} />
          </Grid>
        ))}
      </Grid>
      {filteredBooks.length > itemsPerPage && (
        <Stack spacing={2} sx={{ marginTop: '16px' }}>
          <Pagination count={Math.ceil(filteredBooks.length / itemsPerPage)} page={page} onChange={handleChange} />
        </Stack>
      )}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Book</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this book?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(bookIdToDelete!)} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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
      {deleteError && (
        <Alert variant="outlined" severity="error">
          Cannot delete borrowed book
        </Alert>
      )}
      <Button
        component={Link}
        to="/addBook"
        variant="contained"
        color="primary"
        style={{ margin: '16px' }}
      >
        Add New Book
      </Button>
    </>
  );
};

export default BookList;