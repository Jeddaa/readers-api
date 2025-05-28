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
import { AuthorModule } from 'src/author/author.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
    AuthorModule,
  ],
  controllers: [BookController],
  providers: [BookService, BookRepository],
  exports: [],
})
export class BookModule {}
