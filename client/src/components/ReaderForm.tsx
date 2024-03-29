import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import { ReaderFormData } from '../utils/types';

const ReaderForm: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<ReaderFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: ReaderFormData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/reader', data);
      console.log('Server Response:', response.data);
      navigate('/readerList');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Name" {...register('name', { required: true })} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Email" {...register('email', { required: true })} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Phone" {...register('phone', { required: true, pattern: /^\d+$/ })} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Address" {...register('address', { required: true })} fullWidth />
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

export default ReaderForm;
