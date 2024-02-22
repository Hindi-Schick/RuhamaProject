// entities/Reader.ts
import { IsEmail, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("reader")
export class Reader extends BaseEntity {
  @PrimaryGeneratedColumn()
  reader_id: number;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Column()
  name: string;

  @IsEmail()
  @Column()
  email: string;

  @IsPhoneNumber()
  @Column()
  phone: number;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Column()
  address: string;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date | null;
}
