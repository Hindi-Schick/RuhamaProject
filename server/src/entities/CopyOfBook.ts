// entities/CopyOfBook.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Borrowing } from "./Borrowing";

@Entity("copy_of_book")
export class CopyOfBook extends BaseEntity {
  @PrimaryGeneratedColumn()
  copy_book_id: number;

  @Column()
  title: string;

  @Column()
  book_id: number;

  @Column()
  is_borrowed: boolean;

  @OneToMany(() => Borrowing, borrowing => borrowing.copy_book)
  borrowings: Borrowing[];
}
