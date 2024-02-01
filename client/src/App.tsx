import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import BookForm from './components/BookForm';
import BorrowingForm from './components/BorrowingForm';
import PublisherForm from './components/PublisherForm';
import ReaderForm from './components/ReaderForm';
import BookList from './components/BookList';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ReaderList from './components/ReaderList';
import QuickFilterOutsideOfGrid from './components/BorrowingList'; // Import the new component

import './App.css';

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
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/addBook" element={<BookForm />} />
              <Route path="/addBorrowing" element={<BorrowingForm />} />
              <Route path="/borrowing" element={<QuickFilterOutsideOfGrid />} /> {/* New route */}
              <Route path="/publisher" element={<PublisherForm />} />
              <Route path="/reader" element={<ReaderForm />} />
              <Route path="/bookList" element={<BookList />} />
              <Route path="/readerList" element={<ReaderList />} />
            </Routes>
          </Container>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
