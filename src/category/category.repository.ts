import { Injectable, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './category.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class CategoryRepository {
  constructor(@InjectModel(Category.name) private model: Model<Category>) {}

  async create(data: Category) {
    return await this.model.create(data);
  }
  async findbyIds(ids: Types.ObjectId[]) {
    return await this.model.distinct('_id', { _id: { $in: ids } });
  }
  async findAll() {
    return await this.model.find();
  }

  async findOne(id: string) {
    return await this.model.findById(id);
  }

  async delete(categoryId: Types.ObjectId) {
    return await this.model.findByIdAndDelete(categoryId);
  }
}
