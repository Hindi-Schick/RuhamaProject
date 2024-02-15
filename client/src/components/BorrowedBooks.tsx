import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

type Borrowing = {
    borrowing_id: number;
    copy_book_id: number;
    reader_id: number;
    book_id: number;
    borrow_date: Date;
    return_date: Date | null;
    book_name: string; 
}

const BorrowedBooks: React.FC = () => {
    const { readerId } = useParams<{ readerId: string }>();
    const [borrowedBooks, setBorrowedBooks] = useState<Borrowing[]>([]);

    useEffect(() => {
        const fetchBorrowedBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/reader/${readerId}/borrowedBooks`);
                const borrowedBooksData = await Promise.all(response.data.map(async (borrowedBook: Borrowing) => {
                    const bookResponse = await axios.get(`http://localhost:8080/api/book/${borrowedBook.book_id}`);
                    return {
                        ...borrowedBook,
                        book_name: bookResponse.data.title, // קוראים לשדה title בתשובה של השרת
                    };
                }));
                setBorrowedBooks(borrowedBooksData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBorrowedBooks();
    }, [readerId]);

    return (
        <div>
            <h2>Borrowed Books by {readerId}</h2>
            <Grid container spacing={2} style={{ margin: '10px' }}>
                {Array.isArray(borrowedBooks) && borrowedBooks
                    .filter(borrowedBook => !borrowedBook.return_date)
                    .map((borrowedBook) => (
                        <Grid key={borrowedBook.borrowing_id} item xs={12} sm={6} md={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{borrowedBook.book_name}</Typography>
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

        </div>
    );
};

export default BorrowedBooks;
