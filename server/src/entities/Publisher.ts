// entities/Publisher.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("publisher")
export class Publisher extends BaseEntity {
  @PrimaryGeneratedColumn()
  publisher_id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date | null;
}

