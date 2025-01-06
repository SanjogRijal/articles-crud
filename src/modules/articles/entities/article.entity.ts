import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('article')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  content: string;

  @Column()
  coverImage: string;

  @Column({
    nullable: true,
  })
  source: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
