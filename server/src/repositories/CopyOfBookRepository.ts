// src/repositories/CopyOfBookRepository.ts
import { CopyOfBook } from '../entities/CopyOfBook';

class CopyOfBookRepository {
  static async createCopyOfBook({ is_borrowed, book_id }: { is_borrowed: boolean; book_id: number }): Promise<CopyOfBook> {
    const copyOfBook = CopyOfBook.create({
      is_borrowed,
      book: { book_id }, 
    });

    await copyOfBook.save();
    return copyOfBook;
  }

  static async markBookAsBorrowed(copy_book_id: number): Promise<CopyOfBook | undefined> {
    const copyOfBook = await CopyOfBook.findOne({
      where: { copy_book_id },
    });

    if (!copyOfBook) {
      throw new Error('CopyOfBook not found');
    }

    copyOfBook.is_borrowed = true;
    await copyOfBook.save();

    return copyOfBook;
  }

  static async markBookAsReturned(copy_book_id: number): Promise<CopyOfBook | undefined> {
    const copyOfBook = await CopyOfBook.findOne({
      where: { copy_book_id },
    });

    if (!copyOfBook) {
      throw new Error('CopyOfBook not found');
    }

    copyOfBook.is_borrowed = false;
    await copyOfBook.save();

    return copyOfBook;
  }
}

export default CopyOfBookRepository;
