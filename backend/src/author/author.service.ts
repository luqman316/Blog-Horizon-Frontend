import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  getStatus() {
    return this.authorRepository.find();
  }

  async createOrUpdate(userData: Partial<Author>) {
    const existing = await this.authorRepository.findOneBy({  email: userData.email  });
    if (existing) {
      return this.authorRepository.save({ ...existing, ...userData });
    }
    return this.authorRepository.save(userData);
  }
}
