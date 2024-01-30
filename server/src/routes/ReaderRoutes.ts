// src/routes/ReaderRoutes.ts
import express from 'express';
import ReaderRepository from '../repositories/ReaderRepository';
import { Reader } from '../entities/Reader';

const router = express.Router();

router.post('/api/reader', async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const reader = await ReaderRepository.createReader({ name, email, phone, address });

    return res.json(reader);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/api/readers', async (req, res) => {
  try {
    const readers = await Reader.find(); 
    return res.json(readers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { router as readerRouter };
