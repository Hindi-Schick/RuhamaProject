// src/repositories/BookRepository.ts
import { Book } from '../entities/Book';
import { BorrowingRepository } from './BorrowingRepository';

class BookRepository {
  static async createBook({ title, author, publisher_id, published_date, price }: any): Promise<Book> {
    const book = Book.create({
      title,
      author,
      publisher_id,
      published_date,
      price,
    });

    await book.save();
    return book;
  }

  static async deleteBook(bookId: number): Promise<void> {
    const book = await Book.findOne({ where: { book_id: bookId } });
    if (!book) {
      throw new Error('Book not found');
    }

    const isBookBorrowed = await BorrowingRepository.isBookBorrowed(bookId);
    if (isBookBorrowed) {
      throw new Error('Cannot delete borrowed book');
    }

    book.deleted_at = new Date();
    await book.save();
  }
}

export { BookRepository }; 
