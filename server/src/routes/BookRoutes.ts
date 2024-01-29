// src/routes/BookRoutes.ts
import express from 'express';
import { BookRepository } from '../repositories/BookRepository'; 

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

export { router as bookRouter };
