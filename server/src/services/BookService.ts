// src/services/BookService.ts
import { Book } from '../entities/Book';
import { BookRepository } from '../repositories/BookRepository';

class BookService {
  static async createBook({ title, author, publisher_id, price, published_date }: any): Promise<Book> {
    try {
      const book = await BookRepository.createBook({ title, author, publisher_id, price, published_date });
      return book;
    } catch (error) {
      throw new Error('Error creating book: ' + error.message);
    }
  }

  static async deleteBook(bookId: number): Promise<void> {
    try {
      await BookRepository.deleteBook(bookId);
    } catch (error) {
      throw new Error('Error deleting book: ' + error.message);
    }
  }
}

export { BookService };
