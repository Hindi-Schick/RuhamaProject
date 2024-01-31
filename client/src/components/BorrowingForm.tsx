import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

interface BorrowingFormData {
  copy_book_id: number;
  reader_id: number;
  book_id: number;
  borrow_date: Date;
  return_date: Date;
}

const BorrowingForm: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<BorrowingFormData>();

  const onSubmit = async (data: BorrowingFormData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/borrowing', data);
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
          <TextField label="Copy Book ID" {...register('copy_book_id', { required: true })} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Reader ID" {...register('reader_id', { required: true })} fullWidth />
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

export default BorrowingForm;
