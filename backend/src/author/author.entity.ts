import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Blog } from '../blog/blog.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  profilePicture: string;

  @OneToMany(() => Blog, (blog) => blog.author)
  blogs: Blog[];
}
