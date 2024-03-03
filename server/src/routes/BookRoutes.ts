// src/routes/BookRoutes.ts
import express from 'express';
import { Book } from '../entities/Book';
import { FindOneOptions } from 'typeorm';
import { BookService } from '../services/BookService';
import { BorrowingService } from '../services/BorrowingService';
const router = express.Router();

router.post('/api/book', async (req, res) => {
  const { title, author, publisher_id, published_date, price } = req.body;
  const book = await BookService.createBook({ title, author, publisher_id, published_date, price }); 

  return res.json({ book });
});

router.get('/api/books', async (req, res) => {
  const books = await Book.find({ relations: ['publisher'] });
  return res.json(books);
});

router.get('/api/book/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const book = await Book.findOne(parseInt(bookId) as FindOneOptions<Book>); 

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  return res.json(book);
});

router.get('/api/top10', async (req, res) => {
  const top10Books = await BorrowingService.getTopBorrowedBooks();
  return res.json(top10Books);
});

router.delete('/api/book/:bookId', async (req, res) => {
  const { bookId } = req.params;
  await BookService.deleteBook(parseInt(bookId));
  return res.json({ message: 'Book deleted successfully' });
});

export { router as bookRouter };
