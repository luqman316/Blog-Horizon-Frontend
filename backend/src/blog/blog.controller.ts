// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   NotFoundException,
//   Param,
//   Post,
//   Put,
// } from '@nestjs/common';
// import { BlogService } from './blog.service';

// // import { CreateBlogDto } from './dto/create-blog.dto';

// @Controller('blog')
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Author } from '../author/author.entity'; // Adjust the import path as needed

// export class BlogController {
//   constructor(
//     private readonly blogService: BlogService,
//     @InjectRepository(Author)
//     private readonly authorRepository: Repository<Author>,
//   ) {}

//   //find
//   @Get()
//   getAllBlogs() {
//     return this.blogService.getAllBlogs();
//   }
//   @Get(':id')
//   getBlogById(@Param('id') id: number) {
//     return this.blogService.getBlogById(id);
//   }

//   //Save & Craete
//   @Post()
//   async createBlog(
//     @Body('title') title: string,
//     @Body('content') content: string,
//     @Body('summary') summary: string,
//     @Body('category') category: string,
//     @Body('coverImage') coverImage: string,
//     @Body('publishedDate') publishedDate: string,
//     @Body('authorEmail') authorEmail: string,
//   ) {
//     // Find the author by email from the database
//     const author = await this.authorRepository.findOne({
//     where: { email: authorEmail },
//   });

//   if (!author) {
//     throw new NotFoundException('Author not found');
//   }
//     return await this.blogService.createBlogs(
//       title,
//       content,
//       summary,
//       category,
//       coverImage,
//       publishedDate,
//       author,
//       // authorEmail,
//       // author.firstName,
//       // author.lastName,
//       // author.profilePicture,
//     );
//   }

//   //   update
//   @Put(':id')
//   updateBlogs(
//     @Param('id') id: number,
//     @Body('title') title: string,
//     @Body('content') content: string,
//     @Body('summary') summary: string,
//     @Body('category') category: string,
//     @Body('coverImage') coverImage: string,
//     @Body('publishedDate') publishedDate: string,
//     @Body('authorEmail') authorEmail: string,
//   ) {
//     return this.blogService.updateBlogs(
//       id,
//       title,
//       content,
//       summary,
//       category,
//       coverImage,
//       publishedDate,
//       authorEmail,
//     );
//   }
//   //   delete
//   @Delete(':id')
//   deleteBlog(
//     @Param('id') id: number,
//     @Body('authorEmail') authorEmail: string,
//   ) {
//     return this.blogService.deleteBlog(id, authorEmail);
//   }
// }

import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../author/author.entity'; // ✅ Adjust path if needed
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,

    // Inject author repo to fetch author by email
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  // ✅ Get all blogs
  @Get()
  getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  // ✅ Get one blog by id
  @Get(':id')
  getBlogById(@Param('id') id: number) {
    return this.blogService.getBlogById(id);
  }

  // ✅ Create blog with correct author
  @Post()
  async createBlog(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('summary') summary: string,
    @Body('category') category: string,
    @Body('coverImage') coverImage: string,
    @Body('publishedDate') publishedDate: string,
    @Body('authorEmail') authorEmail: string,
  ) {
    // 1. Find the author by email
    const author = await this.authorRepository.findOne({
      where: { email: authorEmail },
    });

    // 2. If not found, throw error
    if (!author) {
      throw new NotFoundException('Author not found');
    }

    // 3. Create blog with author entity
    return await this.blogService.createBlogs(
      title,
      content,
      summary,
      category,
      coverImage,
      publishedDate,
      authorEmail, // 👈 pass authorEmail as string
      author,      // 👈 pass author entity
     
    );
  }

  // ✅ Update blog (only allowed for author)
  @Put(':id')
  updateBlogs(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('summary') summary: string,
    @Body('category') category: string,
    @Body('coverImage') coverImage: string,
    @Body('publishedDate') publishedDate: string,
    @Body('authorEmail') authorEmail: string,
  ) {
    return this.blogService.updateBlogs(
      id,
      title,
      content,
      summary,
      category,
      coverImage,
      publishedDate,
      authorEmail,
      
    );
  }

  // ✅ Delete blog (only allowed for author)
  @Delete(':id')
  deleteBlog(
    @Param('id') id: number,
    @Query('authorEmail') authorEmail: string,
  ) {
    return this.blogService.deleteBlog(id, authorEmail);
  }
}
