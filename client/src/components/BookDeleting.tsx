import { Modal, Box, Typography, Button, Alert } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { BookDeletingProps } from '../utils/types';

const BookDeleting: React.FC<BookDeletingProps> = ({ open, onClose, bookId, fetchData }) => {
  const [deleteError, setDeleteError] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/book/${bookId}`);
      fetchData();
    } catch (error) {
      console.error(error);
      setDeleteError(true);
    } finally {
      onClose();
      setTimeout(() => setDeleteError(false), 3000);
    }
  };

  return (
    <>
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
        <Typography variant="h6">Delete Book</Typography>
        <Typography>Are you sure you want to delete this book?</Typography>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary">
          Delete
        </Button>
      </Box>
    </Modal>
    {deleteError && (
        <Alert variant="outlined" severity="error">
          Cannot delete borrowed book
        </Alert>
      )}
    </>
  );
};

export default BookDeleting;
