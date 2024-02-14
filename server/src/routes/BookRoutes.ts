// src/routes/BookRoutes.ts
import express from 'express';
import { BookRepository } from '../repositories/BookRepository'; 
import { Book } from '../entities/Book';
import { BorrowingRepository } from '../repositories/BorrowingRepository';

const router = express.Router();

router.post('/api/book', async (req, res) => {
  try {
    const { title, author, publisher_id, published_date } = req.body;
    const book = await BookRepository.createBook({ title, author, publisher_id, published_date }); 

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
