// src/repositories/BorrowingRepository.ts
import { CopyOfBook } from '../entities/CopyOfBook';
import { Borrowing } from '../entities/Borrowing';
import CopyOfBookRepository from './CopyOfBookRepository';
import { Book } from '../entities/Book';

class BorrowingRepository {
  static async createBorrowing({ copy_book_id, reader_id}: { copy_book_id: number, reader_id: number }): Promise<Borrowing> {
    const copyOfBook = await CopyOfBook.findOne({
      where: { copy_book_id: copy_book_id },
    });

    if (!copyOfBook) {
      throw new Error('Failed to mark CopyOfBook as borrowed');
    }

    if (copyOfBook.is_borrowed) {
      throw new Error('CopyOfBook is already borrowed');
    } 
    else {
      const borrowing = Borrowing.create({
        reader_id,
        borrow_date: new Date(), 
        return_date: undefined, 
      });
      
    CopyOfBookRepository.markBookAsBorrowed(copy_book_id);

      await borrowing.save();
      return borrowing;
    }
  }

  static async returnBook(borrow_id: number): Promise<Borrowing | undefined> {
    const borrowing = await Borrowing.findOne({
        where: { borrowing_id: borrow_id }, 
    });
  
    if (!borrowing) {
        throw new Error('Failed to find corresponding borrowing record');
    }
  
    const copy_book_id = borrowing.copy_book_id; 
    const copyOfBook = await CopyOfBook.findOne({
        where: { copy_book_id },
    });
    
    if (!copyOfBook) {
        throw new Error('Failed to mark CopyOfBook as returned');
    }
  
    if (!copyOfBook.is_borrowed) {
      console.log(copyOfBook.is_borrowed);
      console.log(borrowing.borrowing_id);
        throw new Error('The book has not yet been borrowed');
    } else {
        CopyOfBookRepository.markBookAsReturned(copyOfBook.copy_book_id);
  
        borrowing.return_date = new Date();
        await borrowing.save();
        return borrowing;
    }
}

 static async getBorrowedBooksByReaderId({ readerId }: { readerId: string; }): Promise<Borrowing[]> {
  const borrowedBooks = await Borrowing.find({
    where: { reader_id: parseInt(readerId) },
  });
  
    return borrowedBooks;
  }

  static async getAllBorrowingsWithDetails(): Promise<any[]> {
    const borrowings = await Borrowing.find({
      relations: ['copy_book', 'reader'],
    });
    const formattedBorrowings = borrowings.map(borrowing => ({
      borrowing_id: borrowing.borrowing_id,
      book_title: borrowing.copy_book.title,
      reader_name: borrowing.reader.name,
      copy_book_id: borrowing.copy_book,
      borrow_date: borrowing.borrow_date,
      return_date: borrowing.return_date
    }));
    return formattedBorrowings;
  }

  static async getTop10MostBorrowedBooks(): Promise<Book[]> {
    const borrowings = await Borrowing.find();

    const bookCounts: { [key: string]: number } = {};
    for (const borrowing of borrowings) {
      const bookIdStr = borrowing.book.toString();
      if (!bookCounts[bookIdStr]) {
        bookCounts[bookIdStr] = 1;
      } else {
        bookCounts[bookIdStr]++;
      }
    }

    const sortedBookIds = Object.keys(bookCounts).sort((a, b) => bookCounts[b] - bookCounts[a]).slice(0, 10);
    const top10Books: Book[] = await Promise.all(sortedBookIds.map(async (bookId) => {
      const book = await Book.findOne({ where: { book_id: parseInt(bookId) } });
      return book!;
    }));

    return top10Books;
  }
}


export { BorrowingRepository };
