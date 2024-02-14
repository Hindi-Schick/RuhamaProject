import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import './App.css';
import AppRoutes from './routes/AppRoutes';

const queryClient = new QueryClient();

const theme = createTheme();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <Container>
            <AppRoutes/>
          </Container>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
