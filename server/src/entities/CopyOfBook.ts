// entities/CopyOfBook.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

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
}