import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Book, BorrowedBook, Reader } from '../utils/types';

const BorrowedBooks: React.FC = () => {
    const { readerId } = useParams<{ readerId: string }>();
    const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
    const [reader, setReader] = useState<Reader | null>(null);
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [borrowedBooksResponse, readerResponse] = await Promise.all([
                    axios.get(`http://localhost:8080/api/reader/${readerId}/borrowedBooks`),
                    axios.get(`http://localhost:8080/api/reader/${readerId}`)

                ]);

                setBorrowedBooks(borrowedBooksResponse.data);
                setReader(readerResponse.data);

                const booksIds = borrowedBooksResponse.data.map((borrowedBook: { book_id: any; }) => borrowedBook.book_id);
                const booksResponse = await axios.get(`http://localhost:8080/api/books?ids=${booksIds.join(',')}`);
                setBooks(booksResponse.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [readerId]);

    return (
        <div>
            <h2>Borrowed Books by {reader?.name}</h2>
            <Grid container spacing={2} style={{ margin: '10px' }}>
                {Array.isArray(borrowedBooks) && borrowedBooks
                    .filter(borrowedBook => !borrowedBook.return_date)
                    .map((borrowedBook) => (
                        <Grid key={borrowedBook.borrowing_id} item xs={12} sm={6} md={3}>
                            <Card>
                                <CardContent>
                                    {books.find(book => book.book_id)?.title || 'Title Not Found'}
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
