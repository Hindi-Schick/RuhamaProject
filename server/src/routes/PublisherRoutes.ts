// src/routes/PublisherRoutes.ts
import express from 'express';
import {PublisherRepository} from '../repositories/PublisherRepository';
import { Publisher } from '../entities/Publisher';

const router = express.Router();

router.post('/api/publisher', async (req, res) => {
  try {
    const { name, location } = req.body;
    const publisher = await PublisherRepository.createPublisher({ name, location });

    return res.json(publisher);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/api/publishers', async (req, res) => {
  try {
    const publishers = await Publisher.find(); 
    return res.json(publishers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/api/publisher/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const publisher = await PublisherRepository.deletePublisher(parseInt(id)) as Publisher | undefined | null;

    if (!publisher) {
      return res.status(404).json({ error: 'Publisher not found' });
    }

    return res.json({ message: 'Publisher deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { router as publisherRouter };
