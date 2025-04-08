import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { Book, BookDocument } from './book.schema';
import { CreateBookDto } from './book.dto';

@Injectable()
export class BookRepository {
  constructor(@InjectModel(Book.name) private readonly model: Model<Book>) {}

  async createBook(data: Book) {
    return this.model.create(data);
  }

  async findOneBook(bookId: Types.ObjectId) {
    return this.model.findById(bookId);
  }

  async getAllBooks() {
    return this.model.find();
  }

  async saveBook(data: BookDocument) {
    return data.save();
  }
  async update(id: Types.ObjectId, updateQuery?: UpdateQuery<BookDocument>) {
    return this.model.findOneAndUpdate({ _id: id }, updateQuery, {
      new: true,
    });
  }

  async delete(bookId) {
    const deleteBook = await this.model.deleteOne({
      _id: new Types.ObjectId(bookId),
    });
    return deleteBook;
  }

  async findByAuthorId(id) {
    const test = await this.model.find({ authorId: new Types.ObjectId(id) });
    return test;
  }
}
