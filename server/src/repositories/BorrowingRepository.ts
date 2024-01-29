// src/repositories/BorrowingRepository.ts
import { Borrowing } from '../entities/Borrowing';

class BorrowingRepository {
    static async createBorrowing({ copy_book_id, reader_id, book_id, borrow_date, return_date }: any): Promise<Borrowing> {
        const borrowing = Borrowing.create({
            copy_book_id,
            reader_id,
            book_id,
            borrow_date,
            return_date,
        });

        await borrowing.save();
        return borrowing;
    }
}

export { BorrowingRepository };
