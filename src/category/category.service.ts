import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Types } from 'mongoose';
import { CreateCategoryDto } from './category.dto';
import { BookService } from 'src/book/book.service';
import { UserDocument } from 'src/user/user.schema';

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

  async getAllCategory() {
    return await this.categoryRepository.findAll();
  }

  async deleteCategory(user: UserDocument, categoryId: string) {
    const category = await this.categoryRepository.findOne(categoryId);
    if (!category) {
      throw new HttpException(
        { message: 'could not get category' },
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.categoryRepository.delete(new Types.ObjectId(categoryId));
  }
}
