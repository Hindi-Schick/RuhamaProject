// src/routes/CopyOfBookRoutes.ts
import express from 'express';
import CopyOfBookRepository from '../repositories/CopyOfBookRepository';
import { CopyOfBook } from '../entities/CopyOfBook';

const router = express.Router();

router.post('/api/copyOfBook', async (req, res) => {
  try {
    const { title, book_id, is_borrowed } = req.body;
    const copyOfBook = await CopyOfBookRepository.createCopyOfBook({ title, book_id, is_borrowed });

    return res.json(copyOfBook);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/api/copyOfBooks', async (req, res) => {
  try {
    const copyOfBooks = await CopyOfBook.find(); 
    return res.json(copyOfBooks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { router as copyOfBookRouter };
