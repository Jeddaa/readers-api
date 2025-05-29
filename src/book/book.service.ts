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

  async createBook(userId: Types.ObjectId, data: CreateBookDto) {
    const getAuthor = await this.authorService.getAuthorById(data.authorId);
    if (!getAuthor) {
      return {
        message: 'Author not found. Please enter a valid author id',
        data: null,
      };
    }
    // const getCategory = await this.categoryService.getCategoryById(data.authorId);
    // if (!getCategory) {
    //   return {
    //     message: 'Category not found. Please enter a valid category id',
    //     data: null,
    //   };
    // }
    const createBook = new Book();
    Object.assign(createBook, {
      authorId: Types.ObjectId.createFromHexString(data.authorId),
      userId: userId,
      title: data.title,
      description: data.description,
      year: data.year,
      categoryId: Types.ObjectId.createFromHexString(data.categoryId),
      ratings: data.ratings,
    });

    const createdBook = await this.bookRepository.createBook(createBook);
    return { message: 'Book added successfully', data: createdBook };
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
