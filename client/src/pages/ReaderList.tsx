import { Alert, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GenericCard from '../components/GenericCard';
import { Book, Reader } from '../utils/types';

const ReaderList: React.FC = () => {
  const [readers, setReaders] = useState<Reader[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [readerIdToDelete, setReaderIdToDelete] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState(false);

  const fetchReaders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/readers');
      const filteredReaders = response.data.filter((reader: Reader) => !reader.deleted_at);
      filteredReaders.sort((a: { name: string; }, b: { name: string; }) => a.name.localeCompare(b.name));
      setReaders(filteredReaders);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReaders();
  }, []);

  const handleDeleteDialogOpen = (readerId: number) => {
    setReaderIdToDelete(readerId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setReaderIdToDelete(null);
  };

  const handleDelete = async (readerId: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/reader/${readerId}`);
      setReaders(readers.filter(reader => reader.reader_id !== readerId));
      fetchReaders();
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

  return (
    <>
      <Typography variant="h4">Reader List</Typography>
      <Grid container spacing={2}>
        {readers.map((reader) => (
          <Grid key={reader.reader_id} item xs={12} sm={6} md={3}>
            <GenericCard data={reader} handleDeleteDialogOpen={handleDeleteDialogOpen} type={"reader"} handleOpen={function (data: Book): void {
              throw new Error('Function not implemented.');
            } } />
          </Grid>
        ))}
      </Grid>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Reader</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this reader?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(readerIdToDelete!)} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {deleteError && (
        <Alert variant="outlined" severity="error">
          Cannot delete reader with unreturned books
        </Alert>
      )}
      <Button
        component={Link}
        to="/reader"
        variant="contained"
        color="primary"
        style={{ margin: '16px' }}
      >
        Add New Reader
      </Button>
      <Button
        component={Link}
        to="/overdueReaders"
        variant="contained"
        color="primary"
        style={{ margin: '16px' }}
      >
        Overdue Readers
      </Button>
    </>
  );
};

export default ReaderList;
