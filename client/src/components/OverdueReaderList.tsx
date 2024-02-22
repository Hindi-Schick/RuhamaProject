import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { CardActions } from '@mui/material';

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
    <div>
      <h2>Overdue Readers List</h2>
      <Grid container spacing={16}>
                {overdueReaders.map((reader) => (
                    <Grid key={reader.reader_id} item xs={12} sm={6} md={3}>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {reader.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {reader.email}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Phone: {reader.phone}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Address: {reader.address}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" component={Link} to={`/reader/${reader.reader_id}/borrowedBooks`}>
                          View Borrowed Books
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
            </Grid>
    </div>
  );
};

export default OverdueReaderList;
