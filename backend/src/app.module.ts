import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './blog/blog.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '',
      database: 'blog-horion',
      entities: [__dirname + '//**/*.entity.js'],
      synchronize: true, // set to false in production
    }),
    BlogModule,
    AuthorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
