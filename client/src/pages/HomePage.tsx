import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" sx={{ marginTop: 4, marginBottom: 2 }}>
        Welcome Ruhama Library! 
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
      This is a library like no other.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/bookList" sx={{ marginRight: 2 }}>
        Explore Books
      </Button>
      <Button variant="contained" color="secondary" component={Link} to="/borrowing">
        View Borrowings
      </Button>
    </Container>
  );
};

export default HomePage;
