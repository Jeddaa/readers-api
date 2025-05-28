import { Types } from 'mongoose';
import { BookRepository } from './book.repository';
import { CreateBookDto, UpdateBookDto } from './book.dto';
import { Book } from './book.schema';
import { Injectable } from '@nestjs/common';
import { AuthorService } from 'src/author/author.service';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly authorService: AuthorService,
  ) {}

  async createBook(data) {
    const createBook = new Book();
    Object.assign(createBook, {
      title: data.title,
      year: data.year,
      authorId: Types.ObjectId.createFromHexString(data.authorId),
    });
    const getAuthor = await this.authorService.getAuthorById(data.authorId);
    if (!getAuthor) {
      return {
        message: 'Author not found. Please enter a valid author id',
        data: null,
      };
    }
    const createdBook = await this.bookRepository.createBook(createBook);
    return createdBook;
  }
  async getAllBooks() {
    return this.bookRepository.getAllBooks();
  }

  async getBookById(bookId: string) {
    return this.bookRepository.findOneBook(new Types.ObjectId(bookId));
  }

  async updateBook(data: UpdateBookDto) {
    const book = await this.bookRepository.findOneBook(
      new Types.ObjectId(data.bookId),
    );
    if (!book) {
      return {
        message: 'Author not found. Please enter a valid author id',
        data: null,
      };
    }
    return this.bookRepository.update(book._id, data);
  }

  async deleteBook(bookId: string) {
    const removeBook = await this.bookRepository.delete(bookId);
    if (removeBook.deletedCount === 0) {
      return {
        message: 'Could not delete book.',
        data: null,
      };
    }
    return {
      message: 'Book deleted successfully',
      data: removeBook,
    };
  }

  async getBooksByAuthorId(authorId: string) {
    return this.bookRepository.findByAuthorId(authorId);
  }
}
