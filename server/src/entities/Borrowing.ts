// entities/Borrowing.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { CopyOfBook } from "./CopyOfBook";
import { Reader } from "./Reader";

@Entity("borrowing")
export class Borrowing extends BaseEntity {
  @PrimaryGeneratedColumn()
  borrowing_id: number;

  @Column()
  copy_book_id: number;

  @Column()
  reader_id: number;

  @Column()
  book_id: number;

  @Column()
  borrow_date: Date;

  @Column({ type: 'date', nullable: true })
  return_date: Date | null;

  @ManyToOne(() => CopyOfBook, { cascade: true })
  @JoinColumn({ name: "copy_book_id" })
  book_instance: CopyOfBook;

  @ManyToOne(() => Reader, { cascade: true })
  @JoinColumn({ name: "reader_id" })
  reader: Reader;
}