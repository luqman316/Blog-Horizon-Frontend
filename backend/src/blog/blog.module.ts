import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { Author } from 'src/author/author.entity';

// import Blog from './blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, Author])],
  providers: [BlogService],
  controllers: [BlogController]
})
export class BlogModule {}
