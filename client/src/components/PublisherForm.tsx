import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

type PublisherFormData = {
  name: string;
  location: string;
}

const PublisherForm: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<PublisherFormData>();

  const onSubmit = async (data: PublisherFormData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/publisher', data);
      console.log('Server Response:', response.data);
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
          <TextField label="Location" {...register('location', { required: true })} fullWidth />
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

export default PublisherForm;
