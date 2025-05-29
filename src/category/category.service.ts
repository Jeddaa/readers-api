import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Types } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findMultipleIds(ids: string[]) {
    const updateIds = ids.map((id) => Types.ObjectId.createFromHexString(id));
    const getIds = await this.categoryRepository.findbyIds(updateIds);
    return getIds;
  }
}
