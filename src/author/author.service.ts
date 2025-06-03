import { Types } from 'mongoose';
import { AuthorRepository } from './author.repository';
import { CreateAuthorDto, UpdateAuthorDto } from './author.dto';
import { Author } from './author.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDocument } from 'src/user/user.schema';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  async createAuthor(user: UserDocument, data: CreateAuthorDto) {
    const createAuthor = new Author();
    Object.assign(createAuthor, {
      userId: user._id,
      name: data.name,
      birthYear: data.birthYear,
      alias: data.alias,
    });

    const createdAuthor = await this.authorRepository.createAuthor(
      createAuthor,
    );
    return createdAuthor;
  }
  async getAllAuthors() {
    return this.authorRepository.getAllAuthors();
  }

  async getAuthorById(authorId: string) {
    return this.authorRepository.findOneAuthor(new Types.ObjectId(authorId));
  }

  /**
   *
   * @param user
   * @param data
   * @desc updates the name/birthyear/alias of an author only
   * if the loggedin user is the one that created it
   * @returns
   */
  async updateAuthor(
    user: UserDocument,
    data: UpdateAuthorDto,
    authorId: string,
  ) {
    const author = await this.authorRepository.findOneAuthor(
      Types.ObjectId.createFromHexString(authorId),
    );
    if (!author) {
      return {
        message: 'Author not found. Please enter a valid author id',
        data: null,
      };
    }
    if (!author.userId.equals(user._id)) {
      throw new HttpException(
        {
          message: 'You are not authorized to update this author',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return this.authorRepository.update(author._id, data);
  }

  /**
   *
   * @param userId
   * @param authorId
   * @desc gets the author from the database and deletes only
   * if the user trying to delete is the one who created it
   * @returns
   */
  async deleteAuthor(userId: Types.ObjectId, authorId: string) {
    const author = await this.authorRepository.findOneAuthor(
      Types.ObjectId.createFromHexString(authorId),
    );
    if (!author) {
      return {
        message: 'Author not found. Please enter a valid author id',
        data: null,
      };
    }
    if (!author.userId.equals(userId)) {
      throw new HttpException(
        {
          message: 'You are not authorized to update this author',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return this.authorRepository.delete(author._id);
  }
}
