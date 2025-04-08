import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBookDto, UpdateBookDto } from './book.dto';

@Controller('book')
@ApiTags('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get()
  async getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @Post()
  async addBook(@Body() data: CreateBookDto) {
    const add = await this.bookService.createBook(data);
    return add;
  }

  @Delete(':bookId')
  async removeBook(@Param('bookId') bookId: string) {
    return this.bookService.deleteBook(bookId);
  }

  @Get(':bookId')
  async getOneBook(@Param('bookId') bookId: string) {
    return this.bookService.getBookById(bookId);
  }

  @Get('author/:authorId')
  async getBooksByAuthor(@Param('authorId') authorId: string) {
    return this.bookService.getBooksByAuthorId(authorId);
  }

  @Put()
  async updateBook(@Body() data: UpdateBookDto) {
    const add = await this.bookService.updateBook(data);
    return add;
  }
}
