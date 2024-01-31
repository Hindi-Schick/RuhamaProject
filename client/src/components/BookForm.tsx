import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import axios from 'axios';

// Define the type for form data
interface BookFormData {
  title: string;
  author: string;
  publisher_id: number | '';
  published_date: string;
}

interface Publisher {
  publisher_id: number;
  name: string;
}

const BookForm: React.FC = () => {
  const { register, handleSubmit, formState: { isSubmitting }, setValue } = useForm<BookFormData>({
    defaultValues: {
      publisher_id: '' 
    }
  });

  const [publishers, setPublishers] = useState<Publisher[]>([]);

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const response = await axios.get<Publisher[]>(
          'http://localhost:8080/api/publishers'
        );
        setPublishers(response.data);
      } catch (error) {
        console.error('Error fetching publishers:', error);
      }
    };

    fetchPublishers();
  }, []);

  // Correct type for the onChange handler
  const handleSelectChange = (
    event: SelectChangeEvent<{ value: unknown }>
  ) => {
    // Explicitly cast to unknown first, then to number
    setValue('publisher_id', Number(event.target.value as unknown));
  };  

  const onSubmit = async (data: BookFormData) => {
    try {
      // Send data to your server API endpoint to create a new book
      const response = await axios.post(
        'http://localhost:8080/api/book',
        data
      );

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
          <TextField
            label="Title"
            {...register('title', { required: true })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Author"
            {...register('author', { required: true })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Publisher ID</InputLabel>
            {publishers.length > 0 && (
            <Select
              {...register('publisher_id', { required: true })}
              onChange={handleSelectChange} 
            >
              {publishers.map((publisher) => (
                <MenuItem key={publisher.publisher_id} value={publisher.publisher_id}>
                  {publisher.name}
                </MenuItem>
              ))}
            </Select>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="date"
            label="Published Date"
            {...register('published_date', { required: true })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BookForm;
