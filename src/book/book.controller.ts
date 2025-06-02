import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateBookDto, UpdateBookDto } from './book.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('books')
@ApiTags('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @ApiOkResponse({
    description: 'Get all books available in the database',
  })
  @Get()
  async getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Add a book only by authenticated user',
  })
  @Post('/add')
  async addBook(@Request() req, @Body() data: CreateBookDto) {
    const add = await this.bookService.createBook(req.user._id, data);
    return add;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Update a book only by authenticated user',
  })
  @Put('update/:bookId')
  async updateBook(
    @Request() req,
    @Param() bookId: string,
    @Body() data: UpdateBookDto,
  ) {
    const add = await this.bookService.updateBook(req.user._id, bookId, data);
    return add;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Delete a book only by authenticated user',
  })
  @Delete(':bookId')
  async removeBook(@Request() req, @Param('bookId') bookId: string) {
    return this.bookService.deleteBook(req.user, bookId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get a book only by authenticated user',
  })
  @Get(':bookId')
  async getOneBook(@Param('bookId') bookId: string) {
    return this.bookService.getBookById(bookId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get books by an author only by authenticated user',
  })
  @Get('author/:authorId')
  async getBooksByAuthor(@Param('authorId') authorId: string) {
    return this.bookService.getBooksByAuthorId(authorId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get books in a category only by authenticated user',
  })
  @Get('author/:categoryId')
  async getBooksByCategory(@Param('categoryId') categoryId: string) {
    return this.bookService.getBooksByAuthorId(categoryId);
  }
}
