import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './category.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class CategoryRepository {
  constructor(@InjectModel(Category.name) private model: Model<Category>) {}

  async findbyIds(ids: Types.ObjectId[]) {
    // return await this.model.find({ _id: { $in: ids } });
    return await this.model.distinct('_id', { _id: { $in: ids } });
  }
}
