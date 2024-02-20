// entities/CopyOfBook.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Borrowing } from "./Borrowing";
import { Book } from "./Book";

@Entity("copy_of_book")
export class CopyOfBook extends BaseEntity {
  @PrimaryGeneratedColumn()
  copy_book_id: number;

  @Column()
  title: string;

  @Column()
  is_borrowed: boolean;

  @ManyToOne(() => Book, (book) => book.copies, {
    onDelete: "CASCADE",
    eager: true
  })
  @JoinColumn({ name: "book_id" })
  book: Book;

  @OneToMany(() => Borrowing, borrowing => borrowing.copy_book)
  borrowings: Borrowing[];
}
