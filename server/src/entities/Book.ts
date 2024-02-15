// entities/Book.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Publisher } from "./Publisher";
import { CopyOfBook } from "./CopyOfBook";
import { Borrowing } from "./Borrowing";

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

  @Column({ type: "date", nullable: true })
  published_date: Date;

  @ManyToOne(() => Publisher, { cascade: true })
  @JoinColumn({ name: "publisher_id" })
  publisher: Publisher;

  @OneToMany(() => CopyOfBook, copyOfBook => copyOfBook.book_id)
  copies: CopyOfBook[];

  @OneToMany(() => Borrowing, borrowing => borrowing.book_id)
  borrowings: Borrowing[];
}