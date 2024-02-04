// BorrowedBooks.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface CopyOfBook {
    title: string;
    copy_book_id: number;
    is_borrowed: boolean;
}

interface Borrowing {
    borrowing_id: number;
    copy_book_id: number;
    reader_id: number;
    book_id: number;
    borrow_date: Date;
    return_date: Date | null;
}

const BorrowedBooks: React.FC = () => {
    const { readerId } = useParams<{ readerId: string }>();
    const [borrowedBooks, setBorrowedBooks] = useState<Borrowing[]>([]);
    const [availableBooks, setAvailableBooks] = useState<CopyOfBook[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedBook, setSelectedBook] = useState<CopyOfBook | null>(null);

    useEffect(() => {
        const fetchBorrowedBooks = async () => {
            try {
                const response = await axios.get(`/api/reader/${readerId}/borrowed-books`);
                setBorrowedBooks(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBorrowedBooks();
        fetchAvailableBooks();
    }, [readerId]);

    const handleBorrowBook = async () => {
        await fetchAvailableBooks();
        setSelectedBook(null);
        setOpenDialog(true);
    };

    const handleBorrow = async (copyBookId: number) => {
        try {
            await axios.post(`http://localhost:8080/api/borrowing/${copyBookId}`);
            await fetchAvailableBooks();
            setOpenDialog(false);
        } catch (error) {
            console.error('Error borrowing book:', error);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const fetchAvailableBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/copyBooks?isBorrowed=false');
            setAvailableBooks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Borrowed Books</h2>
            <Button variant="contained" color="primary" onClick={() => handleBorrowBook()}>
                Borrow a Book
            </Button>
            <Grid container spacing={2}>
                {Array.isArray(borrowedBooks) && borrowedBooks.map((borrowedBook) => (
                    <Grid key={borrowedBook.borrowing_id} item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{/* שם הספר */}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Borrow Date: {new Date(borrowedBook.borrow_date).toLocaleDateString()}
                                </Typography>
                                {borrowedBook.return_date && (
                                    <Typography variant="body2" color="textSecondary">
                                        Return Date: {new Date(borrowedBook.return_date).toLocaleDateString()}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Borrow a Book</DialogTitle>
                <DialogContent>
                    <ul>
                        {Array.isArray(availableBooks) && availableBooks.map((copyOfBook) => (
                            <li key={copyOfBook.copy_book_id}>
                                <Button onClick={() => setSelectedBook(copyOfBook)}>
                                    {copyOfBook.title}
                                </Button>
                            </li>
                        ))}
                    </ul>
                    {selectedBook && (
                        <DialogContentText>
                            You have selected: {selectedBook.title}
                        </DialogContentText>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => selectedBook && handleBorrow(selectedBook.copy_book_id)} color="primary" disabled={!selectedBook}>
                        Borrow
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BorrowedBooks;
