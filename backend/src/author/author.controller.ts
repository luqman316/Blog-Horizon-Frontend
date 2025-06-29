import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthorService } from './author.service';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
  @Get()
  getStatus() {
    return this.authorService.getStatus();
  }

  @Post()
  async syncUser(@Body() user: any) {
    return await this.authorService.createOrUpdate(user);
  }
}
