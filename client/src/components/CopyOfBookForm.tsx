import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

interface CopyOfBookFormData {
  title: string;
  book_id: number;
  is_borrowed: boolean;
}

const CopyOfBookForm: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<CopyOfBookFormData>();

  const onSubmit = async (data: CopyOfBookFormData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/copyOfBook', data);
      console.log('Server Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {/* Add your form fields here using TextField and register */}
        <Grid item xs={12}>
          <TextField label="Title" {...register('title', { required: true })} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Book ID" {...register('book_id', { required: true })} fullWidth />
        </Grid>
        {/* ... Add more fields as needed */}
        
        <Grid item xs={12}>
          <Button type="submit" variant="contained" disabled={formState.isSubmitting}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CopyOfBookForm;
