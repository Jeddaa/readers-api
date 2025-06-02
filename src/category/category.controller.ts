import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './category.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'create a category only by an admin',
  })
  @Post('/create')
  async createCategory(@Body() data: CreateCategoryDto) {
    return await this.categoryService.createCategory(data);
  }

  @ApiOkResponse({
    description: 'Get all categpries',
  })
  @Get()
  async getAllCategory() {
    return await this.categoryService.getAllCategory();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'create a category only by an admin',
  })
  @Delete(':categoryId')
  async deleteCategory(
    @Request() req,
    @Param('categoryId') categoryId: string,
  ) {
    return await this.categoryService.deleteCategory(req.user, categoryId);
  }
}
