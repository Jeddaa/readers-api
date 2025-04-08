import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { Author, AuthorDocument } from './author.schema';
import { CreateAuthorDto } from './author.dto';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectModel(Author.name) private readonly model: Model<Author>,
  ) {}

  async createAuthor(data: Author) {
    return this.model.create(data);
  }

  async findOneAuthor(AuthorId: Types.ObjectId) {
    return this.model.findById(AuthorId);
  }

  async getAllAuthors() {
    return this.model.find();
  }

  async saveAuthor(data: AuthorDocument) {
    return data.save();
  }

  async update(id: Types.ObjectId, updateQuery?: UpdateQuery<AuthorDocument>) {
    return this.model.findOneAndUpdate({ _id: id }, updateQuery, {
      new: true,
    });
  }

  async delete(AuthorId: Types.ObjectId) {
    return this.model.findOneAndDelete(AuthorId);
  }
}
