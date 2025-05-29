import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book.schema';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { BookService } from './book.service';
import { AuthorModule } from 'src/author/author.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
    AuthorModule,
    CategoryModule,
  ],
  controllers: [BookController],
  providers: [BookService, BookRepository],
  exports: [],
})
export class BookModule {}
