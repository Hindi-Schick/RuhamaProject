// entities/Reader.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("reader")
export class Reader extends BaseEntity {
  @PrimaryGeneratedColumn()
  reader_id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: number;

  @Column()
  address: string;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date | null;
}
