// src/repositories/BorrowingRepository.ts
import { CopyOfBook } from '../entities/CopyOfBook';
import { Borrowing } from '../entities/Borrowing';
import CopyOfBookRepository from './CopyOfBookRepository';
import { Book } from '../entities/Book';

class BorrowingRepository {
  static async createBorrowing({ copy_book_id, reader_id }: { copy_book_id: number; reader_id: number }): Promise<Borrowing> {
    try {
      const copyOfBook = await CopyOfBook.findOneOrFail({ where: { copy_book_id }, relations: ['book'] });
      if (copyOfBook.is_borrowed) {
        throw new Error('CopyOfBook is already borrowed');
      }
  
      copyOfBook.is_borrowed = true;
      await copyOfBook.save();
  
      const borrowing = Borrowing.create({
        copy_book_id,
        reader_id,
        borrow_date: new Date(),
        return_date: undefined,
        book: copyOfBook.book 
      });
  
      await borrowing.save();
      return borrowing;
    } catch (error) {
      throw new Error('Error creating borrowing: ' + error.message);
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

  static async getTopBorrowedBooks(): Promise<Book[]> {
    const borrowings = await Borrowing.find({
      relations: ['book'], // Ensure the book relation is properly populated
    });

    const bookBorrowCounts: { [key: number]: number } = {}; // Specify the type of the object

    borrowings.forEach(borrowing => {
      console.log(borrowing);
      if (borrowing.book) { // Check if the book exists
        const bookId = borrowing.book.book_id as number; // Specify the type as number        

        if (bookBorrowCounts[bookId]) {
          bookBorrowCounts[bookId]++;
        } else {
          bookBorrowCounts[bookId] = 1;
        }
      }
    });

    const sortedBookBorrowCounts = Object.entries(bookBorrowCounts).sort((a, b) => b[1] - a[1]);

    const topBooksIds = sortedBookBorrowCounts.slice(0, 10).map(entry => parseInt(entry[0]));

    const topBooksPromises = topBooksIds.map(async bookId => {
      const book = await Book.findOne({ where: { book_id: bookId } }); // Use proper options
      return book || null;
    });

    const topBooks = await Promise.all(topBooksPromises);

    return topBooks.filter(book => book !== null) as Book[]; // Filter out null values
  }

}

export { BorrowingRepository };
