// src/repositories/PublisherRepository.ts
import { CopyOfBook } from '../entities/CopyOfBook';
import { Book } from '../entities/Book';
import { Publisher } from '../entities/Publisher';
import { Borrowing } from '../entities/Borrowing';

class PublisherRepository {
    static async createPublisher({ name, location }: any): Promise<Publisher> {
        const publisher = Publisher.create({
            name,
            location,
        });

        await publisher.save();
        return publisher;
    }

    static async deletePublisher(publisherId: number): Promise<Publisher | undefined | null> {
        const publisher = await Publisher.findOne({ where: { publisher_id: publisherId } });

        if (!publisher) {
            return null;
        }

        const booksCount = await Book.count({ where: { publisher } });
        if (booksCount > 0) {
            throw new Error("Cannot delete publisher with associated books");
        }

        publisher.deleted_at = new Date();
        await publisher.save();

        return publisher;
    }

    static async generatePaymentReport(publisherId: number): Promise<{ publisher: Publisher, totalPayment: number }> {
        const publisher = await Publisher.findOne({ where: { publisher_id: publisherId } });

        if (!publisher) {
            throw new Error('Publisher not found');
        }

        const copiesOfBooks = await CopyOfBook.createQueryBuilder('copy')
            .leftJoinAndSelect('copy.book', 'book')
            .leftJoinAndSelect('book.publisher', 'publisher')
            .where('publisher.publisher_id = :publisherId', { publisherId })
            .getMany();

        let totalPayment = 0;
        copiesOfBooks.forEach((copy) => {
            totalPayment += copy.book.price;
        });

        return { publisher, totalPayment };
    }
}

export { PublisherRepository };
