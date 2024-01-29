// src/repositories/ReaderRepository.ts
import { Reader } from '../entities/Reader';

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
}

export default ReaderRepository;
