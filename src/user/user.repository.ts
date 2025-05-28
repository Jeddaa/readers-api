import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { Injectable, Type } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private readonly model: Model<User>) {}

  async createUser(data: User) {
    return await this.model.create(data);
  }

  async findUserById(_id: Types.ObjectId) {
    return await this.model.findById(_id);
  }

  async findOne(data: FilterQuery<UserDocument>) {
    return await this.model.findOne(data);
  }

  async findAll(data?: FilterQuery<UserDocument>) {
    return await this.model.find(data);
  }

  async updateOne(id: Types.ObjectId, updateData: UpdateQuery<UserDocument>) {
    return await this.model.findByIdAndUpdate(id, updateData);
  }

  async deleteOne(id: Types.ObjectId) {
    return await this.model.deleteOne({ _id: id });
  }
}
