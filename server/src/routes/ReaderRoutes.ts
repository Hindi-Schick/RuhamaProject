// src/routes/ReaderRoutes.ts
import express from 'express';
import { ReaderRepository } from '../repositories/ReaderRepository';
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

router.get('/api/notReturn', async (req, res) => {
  try {
    const readers = await ReaderRepository.getReadersWithOverdueBooks();
    return res.json(readers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/api/reader/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const reader = await Reader.findOne({ where: { reader_id: parseInt(id) } });

    if (!reader) {
      return res.status(404).json({ error: 'Reader not found' });
    }

    return res.json(reader);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/api/reader/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const reader = await ReaderRepository.deleteReader(parseInt(id)) as Reader | undefined | null;

    if (!reader) {
      return res.status(404).json({ error: 'Reader not found' });
    }

    return res.json({ message: 'Reader deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { router as readerRouter };
