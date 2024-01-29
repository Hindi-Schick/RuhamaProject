// src/repositories/CopyOfBookRepository.ts
import { CopyOfBook } from '../entities/CopyOfBook';

class CopyOfBookRepository {
  static async createCopyOfBook({ title, book_id, is_borrowed }: any): Promise<CopyOfBook> {
    const copyOfBook = CopyOfBook.create({
      title,
      book_id,
      is_borrowed,
    });

    await copyOfBook.save();
    return copyOfBook;
  }
}

export default CopyOfBookRepository;
