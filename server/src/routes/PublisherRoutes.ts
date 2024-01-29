// src/routes/PublisherRoutes.ts
import express from 'express';
import {PublisherRepository} from '../repositories/PublisherRepository';

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

export { router as publisherRouter };
