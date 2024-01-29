// src/repositories/BookRepository.ts
import { Book } from '../entities/Book';

class BookRepository {
  static async createBook({ title, author, publisher_id, published_date }: any): Promise<Book> {
    const book = Book.create({
      title,
      author,
      publisher_id,
      published_date,
    });

    await book.save();
    return book;
  }
}

export { BookRepository }; 
