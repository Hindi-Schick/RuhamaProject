import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

const BookForm: React.FC = () => {
  const { register, handleSubmit, formState } = useForm();

  const onSubmit = async (data: any) => {
    try {
      // Send data to your server API endpoint to create a new book
      const response = await axios.post('http://localhost:8080/api/book', data);
      
      // Log the server response (optional)
      console.log('Server Response:', response.data);
    } catch (error) {
      // Handle errors (e.g., show an error message to the user)
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Title" {...register('title', { required: true })} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Author" {...register('author', { required: true })} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Publisher ID" {...register('publisher_id', { required: true })} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField type="date" label="Published Date" {...register('published_date', { required: true })} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" disabled={formState.isSubmitting}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BookForm;
