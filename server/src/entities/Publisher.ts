// entities/Publisher.ts
import { IsString, MaxLength, MinLength } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Book } from "./Book";

@Entity("publisher")
export class Publisher extends BaseEntity {
  @PrimaryGeneratedColumn()
  publisher_id: number;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Column()
  name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Column()
  location: string;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date | null;

  @OneToMany(() => Book, (book) => book.publisher)
  books: Book[];
}

