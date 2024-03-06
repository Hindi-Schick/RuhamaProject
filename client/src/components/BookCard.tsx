import { Delete, PlusOne } from '@mui/icons-material';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Book } from '../utils/types';
import BookAdding from './BookAdding';
import BookDeleting from './BookDeleting';

const BookCard: React.FC<{
    book: Book;
    fetchData: () => void;
}> = ({ book, fetchData }) => {
    const [open, setOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [bookIdToDelete, setBookIdToDelete] = useState<number | null>(null);

    const handleOpenAddBook = () => {
        setSelectedBook(book);
        setOpen(true);
    };

    const handleCloseAddBook = () => {
        setOpen(false);
    };

    const handleDeleteDialogOpen = () => {
        setBookIdToDelete(book.book_id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
        setBookIdToDelete(null);
    };

        return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h5">{book.title}</Typography>
                    <Typography>Published on: {new Date(book.published_date).toLocaleDateString()}</Typography>
                    <Typography>Publisher: {book.publisher?.name}</Typography>
                    <Typography>Price: {book.price}₪</Typography>
                </CardContent>
                <IconButton onClick={handleOpenAddBook} color="primary" aria-label="add copy">
                    <PlusOne />
                </IconButton>
                <IconButton onClick={handleDeleteDialogOpen} color="secondary" aria-label="delete">
                    <Delete />
                </IconButton>
            </Card>
            <BookDeleting open={deleteDialogOpen} onClose={handleDeleteDialogClose} bookId={bookIdToDelete} fetchData={fetchData} />
            <BookAdding open={open} onClose={handleCloseAddBook} selectedBook={selectedBook} />
        </>
    );
};

export default BookCard;
