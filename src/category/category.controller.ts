import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './category.dto';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post('/create')
  async createCategory(@Body() data: CreateCategoryDto) {
    return await this.categoryService.createCategory(data);
  }
}
