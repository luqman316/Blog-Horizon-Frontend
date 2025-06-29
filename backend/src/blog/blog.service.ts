import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/author/author.entity';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  getAllBlogs() {
    return this.blogRepository.find({
      relations: ['author'],
      select: {
        id: true,
        title: true,
        content: true,
        summary: true,
        category: true,
        coverImage: true,
        publishedDate: true,
        author: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          profilePicture: true,
        },
      },
    });
  }

  getBlogById(id: number) {
    return this.blogRepository.findOne({
      where: { id },
      relations: ['author'],
    });
  }

  async createBlogs(
    title: string,
    content: string,
    summary: string,
    category: string,
    coverImage: string,
    publishedDate: string,
    authorEmail: string, // Assuming you want to associate the blog with an author
    author?: Author, // Optional: You can pass an Author object directly
  
  ) {
    // Find the author by email
    // let author = await this.authorRepository.findOne({
    //   where: { email: authorEmail },
    // });
    if (!author) {
      author = this.authorRepository.create({

        firstName: authorEmail,
        lastName: authorEmail, // You can set a default last name or handle it differently
        email: authorEmail,
        profilePicture: authorEmail, // Set a default profile picture or handle it differently
      });
      await this.authorRepository.save(author);
    }
    let blog = this.blogRepository.create({
      title,
      content,
      summary,
      category,
      coverImage,
      publishedDate,
      author, // Associate the blog with the author    
    });
    this.blogRepository.save(blog);
    return { message: 'blog created successfully' };
  }

  async updateBlogs(
    id: number,
    title: string,
    content: string,
    summary: string,
    category: string,
    coverImage: string,
    publishedDate: string,
    authorEmail: string, // Assuming you want to update the author as well
    // author: Author
  ) {
    let blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      return { message: 'Blog not found' };
    }
    // Only author can update
    if (blog.author.email !== authorEmail) {
      return { message: 'Not allowed' };
    }
    blog.title = title;
    blog.content = content;
    blog.summary = summary;
    blog.category = category;
    blog.coverImage = coverImage;
    blog.publishedDate = publishedDate;

    await this.blogRepository.save(blog);
    return { message: 'Blog updated successfully' };
  }
  async deleteBlog(id: number, authorEmail: string) {
    let blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      return { message: 'Blog not found' };
    }
    // Only author can delete
    if (blog.author.email !== authorEmail) {
      return { message: 'Not allowed' };
    }
    await this.blogRepository.delete(id);
    return { message: 'Blog deleted successfully' };
  }
}
