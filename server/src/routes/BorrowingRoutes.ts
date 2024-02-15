// src/routes/BorrowingRoutes.ts

import express from 'express';
import { BorrowingRepository } from '../repositories/BorrowingRepository';

const router = express.Router();

router.post('/api/borrowing', async (req, res) => {
  try {
    const { copy_book_id, reader_id } = req.body;
    const borrowing = await BorrowingRepository.createBorrowing({ copy_book_id, reader_id });

    return res.json(borrowing);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/api/borrowings', async (req, res) => {
  try {
    const borrowings = await BorrowingRepository.getAllBorrowingsWithDetails();
    return res.json(borrowings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.patch('/api/returnBook', async (req, res) => {
  try {
    const { borrow_id } = req.body;
    const returnedBook = await BorrowingRepository.returnBook(borrow_id);

    return res.json(returnedBook);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/api/reader/:readerId/borrowedBooks', async (req, res) => {
  try {
    const { readerId } = req.params;
    const borrowedBooks = await BorrowingRepository.getBorrowedBooksByReaderId({ readerId });
    return res.json(borrowedBooks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { router as borrowingRouter };
