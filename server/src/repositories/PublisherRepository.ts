// src/repositories/PublisherRepository.ts
import { Book } from '../entities/Book';
import { Publisher } from '../entities/Publisher';

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

        const booksCount = await Book.count({ where: { publisher_id: publisherId } });
        if (booksCount > 0) {
            throw new Error("Cannot delete publisher with associated books");
        }

        publisher.deleted_at = new Date();
        await publisher.save();

        return publisher;
    }
}

export { PublisherRepository };
