// src/repositories/ReaderRepository.ts
import { Reader } from '../entities/Reader';
import { BorrowingRepository } from './BorrowingRepository';

class ReaderRepository {
  static async createReader({ name, email, phone, address }: any): Promise<Reader> {
    const reader = Reader.create({
      name,
      email,
      phone,
      address,
    });

    await reader.save();
    return reader;
  }

  static async getReadersWithOverdueBooks(): Promise<Reader[]> {
    const readers = await Reader.find();
    const readersWithOverdueBooks: Reader[] = [];

    for (const reader of readers) {
      const borrowings = await BorrowingRepository.getBorrowedBooksByReaderId({ readerId: reader.reader_id.toString() });
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000 * 2);

      for (const borrowing of borrowings) {
        if (borrowing.borrow_date < weekAgo && !borrowing.return_date) {
          readersWithOverdueBooks.push(reader);
          break;
        }
      }
    }

    return readersWithOverdueBooks;
  }

  static async deleteReader(readerId: number): Promise<Reader | undefined | null> {
    const reader = await Reader.findOne({ where: { reader_id: readerId } });

    if (reader) {
      const borrowings = await BorrowingRepository.getBorrowedBooksByReaderId({ readerId: reader?.reader_id.toString() });
      const hasUnreturnedBooks = borrowings.some(borrowing => !borrowing.return_date);

      if (hasUnreturnedBooks) {
        throw new Error('Cannot delete reader with unreturned books');
      }

      reader.deleted_at = new Date();
      await reader.save();
    }

    return reader;
  }
}

export default ReaderRepository;
