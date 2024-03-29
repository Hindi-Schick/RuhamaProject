// entities/Borrowing.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { CopyOfBook } from "./CopyOfBook";
import { Reader } from "./Reader";
import { Book } from "./Book";
import { IsDataURI, IsDate } from "class-validator";

@Entity()
export class Borrowing extends BaseEntity {
  @PrimaryGeneratedColumn()
  borrowing_id: number;

  @IsDate()
  @Column()
  borrow_date: Date;

  @Column({ type: 'date', nullable: true })
  return_date: Date | null;

  @ManyToOne(() => CopyOfBook, { cascade: true })
  @JoinColumn({ name: "copy_book_id" })
  copy_book: CopyOfBook;

  @ManyToOne(() => Reader, { cascade: true })
  @JoinColumn({ name: "reader_id" })
  reader: Reader;

  @ManyToOne(() => Book, { cascade: true })
  @JoinColumn({ name: "book_id" })
  book: Book;
}