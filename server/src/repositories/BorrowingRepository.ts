// src/repositories/BorrowingRepository.ts
import { CopyOfBook } from '../entities/CopyOfBook';
import { Borrowing } from '../entities/Borrowing';
import CopyOfBookRepository from './CopyOfBookRepository';

class BorrowingRepository {
  static async createBorrowing({ copy_book_id, reader_id}: number | any): Promise<Borrowing> {
    const copyOfBook = await CopyOfBook.findOne({
      where: { copy_book_id }, 
    });

    if (!copyOfBook) {
      throw new Error('Failed to mark CopyOfBook as borrowed');
    }

    if (copyOfBook.is_borrowed) {
      throw new Error('CopyOfBook is already borrowed');
    } 
    else {
      const borrowing = Borrowing.create({
        copy_book_id,
        reader_id,
        book_id: copyOfBook.book_id,
        borrow_date: new Date(), 
        return_date: undefined, 
      });
    CopyOfBookRepository.markBookAsBorrowed(copy_book_id);

      await borrowing.save();
      return borrowing;
    }
  }

  static async returnBook(borrow_id: number): Promise<CopyOfBook | undefined> { 
    const borrowing = await Borrowing.findOne({
      where: { borrowing_id: borrow_id }, 
    });
  
    if (!borrowing) {
      throw new Error('Failed to find corresponding borrowing record');
    }
  
    const copyOfBook = await CopyOfBook.findOne({
      where: { copy_book_id: borrowing.copy_book_id },
    });
  
    if (!copyOfBook) {
      throw new Error('Failed to mark CopyOfBook as returned');
    }
  
    if (!copyOfBook.is_borrowed) {
      throw new Error('The book has not yet been borrowed');
    } else {
      CopyOfBookRepository.markBookAsReturned(copyOfBook.copy_book_id);
  
      borrowing.return_date = new Date();
      await borrowing.save();
      return copyOfBook;
    }
  }
}

export { BorrowingRepository };
