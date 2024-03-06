import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';

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
             <Card
              title={reader.name}
              details={[
                'Phone: ' + reader.phone,
                'Address: ' + reader.address,
                 reader.email
              ]}
              actions={
                <Button size="small" component={Link} to={`/reader/${reader.reader_id}/borrowedBooks`}>
                View Borrowed Books
              </Button>
              }
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default OverdueReaderList;
