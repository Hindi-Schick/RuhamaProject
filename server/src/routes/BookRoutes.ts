// src/routes/BookRoutes.ts
import express from 'express';
import { BookRepository } from '../repositories/BookRepository'; 
import { Book } from '../entities/Book';
import { BorrowingRepository } from '../repositories/BorrowingRepository';
import { FindOneOptions } from 'typeorm';

const router = express.Router();

router.post('/api/book', async (req, res) => {
  try {
    const { title, author, publisher_id, published_date, price } = req.body;
    const book = await BookRepository.createBook({ title, author, publisher_id, published_date, price }); 

    return res.json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find(); 
    return res.json(books);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/api/book/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findOne(parseInt(bookId) as FindOneOptions<Book>); 

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    return res.json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/api/top10', async (req, res) => {
  try {
    const top10Books = await BorrowingRepository.getTop10MostBorrowedBooks();
    return res.json(top10Books);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { router as bookRouter };
