import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid, Select, FormControl, SelectChangeEvent, InputLabel, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BorrowingFormData, CopyOfBook, Reader } from '../utils/types';

const BorrowingForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, setValue } = useForm<BorrowingFormData>();

  const onSubmit = async (data: BorrowingFormData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/borrowing', data);
      console.log('Server Response:', response.data);
      navigate('/borrowing');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [copyBooks, setCopyBooks] = useState<CopyOfBook[]>([]);
  const [readers, setReaders] = useState<Reader[]>([]);
  const [selectedTitles, setSelectedTitles] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchCopyBooks = async () => {
      try {
        const copyBooksResponse = await axios.get<CopyOfBook[]>(
          'http://localhost:8080/api/copyBooks'
        );
        setCopyBooks(copyBooksResponse.data);
        console.log(copyBooks);

        const readersResponse = await axios.get<Reader[]>('http://localhost:8080/api/readers');
        setReaders(readersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCopyBooks();
  }, []);

  const handleSelectChange = (event: SelectChangeEvent<{ value: unknown }>, fieldName: String | any) => {
    setValue(fieldName, Number(event.target.value as unknown));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Choose a Book</InputLabel>
            {copyBooks.length > 0 && (
              <Select
                {...register('copy_book_id', { required: true })}
                onChange={(e: any) => {
                  handleSelectChange(e, 'copy_book_id');

                  const selectedCopyBook = copyBooks.find(copyOfBook => copyOfBook.copy_book_id === e.target.value);
                  console.log({ selectedCopyBook });

                  if (selectedCopyBook) {
                    setSelectedTitles(prevState => new Set(prevState.add(selectedCopyBook.title)));
                  }
                }}
              >
                {copyBooks
                  .filter((copyOfBook) => {
                    return !copyOfBook.is_borrowed && !selectedTitles.has(copyOfBook.title) && !copyOfBook.book.deleted_at;
                  })
                  .map((copyOfBook) => (
                    <MenuItem key={copyOfBook.copy_book_id} value={copyOfBook.copy_book_id}>
                      {copyOfBook.book.title}
                    </MenuItem>
                  ))}
              </Select>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Choose a Reader</InputLabel>
            {readers.length > 0 && (
              <Select
                {...register('reader_id', { required: true })}
                onChange={(e: any) => handleSelectChange(e, 'reader_id')}
              >
                {readers.map((reader) => (
                  <MenuItem key={reader.reader_id} value={reader.reader_id}>
                    {reader.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" disabled={formState.isSubmitting}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default BorrowingForm;
