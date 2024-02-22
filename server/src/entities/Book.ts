import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Publisher } from "./Publisher";
import { CopyOfBook } from "./CopyOfBook";
import { Borrowing } from "./Borrowing";
import { IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

@Entity("book")
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  book_id: number;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Column()
  title: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Column()
  author: string;

  @IsNumber()
  @Max(1000)
  @Min(1)
  @Column()
  price: number;

  @Column({ type: "date", nullable: true })
  published_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @ManyToOne(() => Publisher, { cascade: true })
  @JoinColumn({ name: "publisher_id" })
  publisher: Publisher;

  @OneToMany(() => CopyOfBook, (copyOfBook) => copyOfBook.book, {
    onDelete: "CASCADE",
  })
  copies: CopyOfBook[];

  @OneToMany(() => Borrowing, borrowing => borrowing.book)
  borrowings: Borrowing[];
}
