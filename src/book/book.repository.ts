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

  async saveBook(data: BookDocument) {
    return data.save();
  }
  async update(id: Types.ObjectId, updateQuery?: UpdateQuery<BookDocument>) {
    return this.model.findByIdAndUpdate(id, updateQuery);
  }

  async delete(bookId: string) {
    const deleteBook = await this.model.deleteOne({
      _id: new Types.ObjectId(bookId),
    });
    return deleteBook;
  }

  async findByAuthorId(authorId: string) {
    const test = await this.model.find({
      authorId: new Types.ObjectId(authorId),
    });
    return test;
  }

  async getAllBooks(data?) {
    const match: Record<string, any> = {};

    if (data?.id) {
      match._id = new Types.ObjectId(data.id);
    }
    if (data?.categoryId) {
      match.categoryIds = new Types.ObjectId(data.categoryId);
    }
    if (data?.authorId) {
      match.authorId = new Types.ObjectId(data.authorId);
    }
    const result = await this.model.aggregate([
      {
        $match: match ?? {},
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
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          year: 1,
          ratings: 1,
          authorName: '$author.name',
          categories: '$categories.name',
        },
      },
    ]);
    return result;
  }
}
