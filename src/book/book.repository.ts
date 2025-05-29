import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { Book, BookDocument } from './book.schema';
import { CreateBookDto } from './book.dto';
import { title } from 'process';

@Injectable()
export class BookRepository {
  constructor(@InjectModel(Book.name) private readonly model: Model<Book>) {}

  async createBook(data: Book) {
    return this.model.create(data);
  }

  async findOneBook(bookId: Types.ObjectId) {
    return this.model.findById(bookId);
  }

  // async getAllBooks() {
  //   return this.model.find();
  // }

  async saveBook(data: BookDocument) {
    return data.save();
  }
  async update(id: Types.ObjectId, updateQuery?: UpdateQuery<BookDocument>) {
    return this.model.findByIdAndUpdate(id, updateQuery);
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

  async getAllBooks(id?: Types.ObjectId) {
    return await this.model.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      {
        $lookup: {
          from: 'authors',
          localField: 'authorId',
          foreignField: '_id',
          as: 'author',
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryIds',
          foreignField: '_id',
          as: 'categories',
        },
      },
      {
        $unwind: '$author',
      },
      {
        $unwind: '$category',
      },
      {
        $project: {
          title: 1,
          description: 1,
          year: 1,
          ratings: 1,
          authorName: {
            $concat: ['$author.firstName', '', '$author.lastName'],
          },
          categories: '$categories.name',
        },
      },
    ]);
  }
}
