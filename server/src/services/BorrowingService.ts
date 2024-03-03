import { BorrowingRepository } from '../repositories/BorrowingRepository';
import { Borrowing } from '../entities/Borrowing';
import { Book } from '../entities/Book';

class BorrowingService {
  static async createBorrowing({ copy_book_id, reader_id }: { copy_book_id: number; reader_id: number }): Promise<Borrowing> {
    return BorrowingRepository.createBorrowing({ copy_book_id, reader_id });
  }

  static async isBookBorrowed(bookId: number): Promise<boolean> {
    return BorrowingRepository.isBookBorrowed(bookId);
  }

  static async returnBook(borrow_id: number): Promise<Borrowing | undefined> {
    return BorrowingRepository.returnBook(borrow_id);
  }

  static async getBorrowedBooksByReaderId({ readerId }: { readerId: string }): Promise<Borrowing[]> {
    return BorrowingRepository.getBorrowedBooksByReaderId({ readerId });
  }

  static async getAllBorrowingsWithDetails(): Promise<any[]> {
    return BorrowingRepository.getAllBorrowingsWithDetails();
  }

  static async getTopBorrowedBooks(): Promise<Book[]> {
    const borrowings = await BorrowingRepository.getBorrowingsWithBookRelations(); // Assuming getAllBorrowingsWithBookRelations exists
    const bookBorrowCounts: { [key: number]: number } = {};

    borrowings.forEach((borrowing: Borrowing) => { // Specify borrowing type
      if (borrowing.book) {
        const bookId = borrowing.book.book_id as number;

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
      const book = await Book.findOne({ where: { book_id: bookId } });
      return book || null;
    });

    const topBooks = await Promise.all(topBooksPromises);

    return topBooks.filter((book): book is Book => book !== null);
  }
}

export { BorrowingService };
