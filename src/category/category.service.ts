import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Types } from 'mongoose';
import { CreateCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async createCategory(data: CreateCategoryDto) {
    return await this.categoryRepository.create(data);
  }
  async findMultipleIds(ids: string[]) {
    const updateIds = ids.map((id) => Types.ObjectId.createFromHexString(id));
    const getIds = await this.categoryRepository.findbyIds(updateIds);
    return getIds;
  }
}
