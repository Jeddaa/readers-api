import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book.schema';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { BookService } from './book.service';
import { AuthorService } from 'src/author/author.service';
import { Author, AuthorSchema } from 'src/author/author.schema';
import { AuthorController } from 'src/author/author.controller';
import { AuthorRepository } from 'src/author/author.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Author.name,
        schema: AuthorSchema,
      },
    ]),
  ],
  controllers: [BookController, AuthorController],
  providers: [BookService, BookRepository, AuthorRepository, AuthorService],
  exports: [],
})
export class BookModule {}
