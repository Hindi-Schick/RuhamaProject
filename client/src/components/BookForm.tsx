import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define the type for form data
type BookFormData = {
  title: string;
  author: string;
  publisher_id: number | '';
  published_date: string;
  numCopies: number;
  price: number;
}

type Publisher = {
  publisher_id: number;
  name: string;
}

const BookForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<BookFormData>({
    defaultValues: {
      publisher_id: '',
      numCopies: 1, // Default to 1 copy
      price: 0, // Default price to 0
    },
  });
  

  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const navigate = useNavigate();

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

  const handleSelectChange = (
    event: SelectChangeEvent<{ value: unknown }>
  ) => {
    setValue('publisher_id', Number(event.target.value as unknown));
  };

  const onSubmit = async (data: BookFormData) => {
    try {
      const { numCopies, ...bookData } = data;
  
      if (numCopies <= 0) {
        alert('It is not possible to add a book without copies');
        return;
      }
  
      const response = await axios.post(
        'http://localhost:8080/api/book',
        bookData
      );
  
      console.log('Server Response (Book):', response.data);
  
      for (let i = 1; i <= numCopies; i++) {
        // Customize the copy data as needed
        const copyData = {
          title: bookData.title,
          book_id: response.data.book_id, 
          is_borrowed: false, 
        };
  
        const copyResponse = await axios.post(
          'http://localhost:8080/api/copyOfBook',
          copyData
        );
  
        console.log(`Server Response (Copy ${i}):`, copyResponse.data);
        navigate('/booklist');
      }
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
            <InputLabel>Publisher</InputLabel>
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
          <TextField
            label="Price"
            type="number"
            {...register('price', { required: true, min: 0 })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Number of Copies"
            type="number"
            {...register('numCopies', { required: true, min: 1 })}
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
