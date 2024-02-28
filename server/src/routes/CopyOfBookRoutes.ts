// src/routes/CopyOfBookRoutes.ts
import express from 'express';
import CopyOfBookRepository from '../repositories/CopyOfBookRepository';
import { CopyOfBook } from '../entities/CopyOfBook';

const router = express.Router();

router.post('/api/copyOfBook', async (req, res) => {
  try {
    const { is_borrowed, book_id } = req.body;
    const copyOfBook = await CopyOfBookRepository.createCopyOfBook({ is_borrowed, book_id });

    return res.json(copyOfBook);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/api/copyBooks', async (req, res) => {
  try {
    const copyBooks = await CopyOfBook.find({ relations: ['book']}); 
    return res.json(copyBooks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { router as copyOfBookRouter };
