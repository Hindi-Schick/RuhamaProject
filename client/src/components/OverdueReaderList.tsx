import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import GenericCard from './GenericCard';
import { Book } from '../utils/types';

const OverdueReaderList: React.FC = () => {
  const [overdueReaders, setOverdueReaders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOverdueReaders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/notReturn');
        setOverdueReaders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOverdueReaders();
  }, []);

  return (
    <>
      <Typography variant="h4">Overdue Readers List</Typography>
      <Grid container spacing={16}>
        {overdueReaders.map((reader) => (
          <Grid key={reader.reader_id} item xs={12} sm={6} md={3}>
            <GenericCard data={reader} type={"overduReader"} handleDeleteDialogOpen={function (id: number): void {
              throw new Error('Function not implemented.');
            } } handleOpen={function (data: Book): void {
              throw new Error('Function not implemented.');
            } } />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default OverdueReaderList;
