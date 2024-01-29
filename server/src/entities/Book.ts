// entities/Book.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { Publisher } from "./Publisher";

@Entity("book")
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  book_id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publisher_id: number;

  @Column()
  published_date: number;

  @ManyToOne(() => Publisher, { cascade: true })
  @JoinColumn({ name: "publisher_id" })
  publisher: Publisher;
}
