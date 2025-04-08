import { Types } from 'mongoose';
import { AuthorRepository } from './author.repository';
import { CreateAuthorDto } from './author.dto';
import { Author } from './author.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorService {
  constructor(private readonly AuthorRepository: AuthorRepository) {}

  async createAuthor(data: CreateAuthorDto) {
    const createAuthor = new Author();
    Object.assign(createAuthor, {
      name: data.name,
      birthYear: data.birthYear,
    });

    const createdAuthor = await this.AuthorRepository.createAuthor(
      createAuthor,
    );
    return createdAuthor;
  }
  async getAllAuthors() {
    return this.AuthorRepository.getAllAuthors();
  }

  async getAuthorById(AuthorId: string) {
    return this.AuthorRepository.findOneAuthor(new Types.ObjectId(AuthorId));
  }

  async updateAuthor(data) {
    const author = await this.AuthorRepository.findOneAuthor(
      new Types.ObjectId(data.authorId),
    );
    if (!author) {
      return {
        message: 'Author not found. Please enter a valid author id',
        data: null,
      };
    }
    return this.AuthorRepository.update(author._id, data);
  }

  async deleteAuthor(AuthorId: string) {
    return this.AuthorRepository.delete(new Types.ObjectId(AuthorId));
  }
}
