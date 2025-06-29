// src/blog/blog.entity.ts
import { Author } from 'src/author/author.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { Author } from '../author/author.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  summary: string;

  @Column()
  category: string;

  @Column()
  coverImage: string;

  @Column({ type: 'date' })
  publishedDate: string;

  @ManyToOne(() => Author, (author) => author.blogs, { eager: true })
  author: Author;
}
