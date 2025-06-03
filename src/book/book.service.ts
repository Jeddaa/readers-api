import { Types } from 'mongoose';
import { BookRepository } from './book.repository';
import { CreateBookDto, UpdateBookDto } from './book.dto';
import { Book } from './book.schema';
import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AuthorService } from 'src/author/author.service';
import { CategoryService } from 'src/category/category.service';
import { UserDocument } from 'src/user/user.schema';

@Injectable()
export class BookService {
  constructor(
    // @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,
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
    const getCategory = await this.categoryService.findMultipleIds(
      data.categoryIds,
    );
    if (!getCategory) {
      return {
        message: 'Category not found. Please enter a valid category id',
        data: null,
      };
    }
    const createBook = new Book();
    Object.assign(createBook, {
      authorId: getAuthor._id,
      userId: userId,
      title: data.title,
      description: data.description,
      year: data.year,
      categoryIds: getCategory,
      ratings: data.ratings,
    });

    const createdBook = await this.bookRepository.createBook(createBook);
    return { message: 'Book added successfully', data: createdBook };
  }
  async getAllBooks(data?) {
    return this.bookRepository.getAllBooks(data ?? {});
  }

  async getBookById(bookId: string) {
    return this.bookRepository.getAllBooks({ id: new Types.ObjectId(bookId) });
  }

  /**
   *
   * @param userId
   * @param bookId
   * @param data
   * @desc: takes in the userId, gets the book using the bookId, confirms if the userId is
   * the same as the userid in the book document
   * @returns
   */
  async updateBook(user: UserDocument, bookId: string, data: UpdateBookDto) {
    const getBook = await this.bookRepository.findOneBook(
      Types.ObjectId.createFromHexString(bookId),
    );
    if (!getBook) {
      return {
        message: 'Book not found. Please pass a valid book id',
        data: null,
      };
    }
    if (!getBook.userId.equals(user._id)) {
      throw new HttpException(
        { message: 'Only the creator of this book can update it' },
        HttpStatus.FORBIDDEN,
      );
    }
    let author = null;
    let categories = null;
    if (data.authorId) {
      author = await this.authorService.getAuthorById(data.authorId);
      if (!author) {
        return {
          message: 'Author not found. Please enter a valid author ID',
          data: null,
        };
      }
      data.authorId = author._id;
    }
    if (data.categoryIds && data.categoryIds.length > 0) {
      categories = await this.categoryService.findMultipleIds(data.categoryIds);

      if (!categories || categories.length !== data.categoryIds.length) {
        return {
          message: 'Some category IDs are invalid. Please check and try again.',
          data: null,
        };
      }
      data.categoryIds = categories;
    }

    const updatedBook = await this.bookRepository.update(getBook._id, data);
    return {
      message: 'Book updated successfully',
      data: updatedBook,
    };
  }

  async deleteBook(user, bookId: string) {
    const book = await this.bookRepository.findOneBook(
      new Types.ObjectId(bookId),
    );
    if (!book) {
      throw new HttpException(
        { message: 'Could not find book. Check the id and try again' },
        HttpStatus.NOT_FOUND,
      );
    }
    if (!book.userId.equals(user._id)) {
      throw new HttpException(
        { message: 'Only creator can delete book' },
        HttpStatus.FORBIDDEN,
      );
    }
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
    return this.bookRepository.getAllBooks({
      authorId: new Types.ObjectId(authorId),
    });
  }

  async getBooksByCategoryId(categoryId: string) {
    return this.bookRepository.getAllBooks({
      categoryId: new Types.ObjectId(categoryId),
    });
  }
}
