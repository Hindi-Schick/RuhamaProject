// src/repositories/PublisherRepository.ts
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
}

export { PublisherRepository };
