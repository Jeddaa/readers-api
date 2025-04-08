import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateAuthorDto, updateAuthorDto } from './author.dto';

@Controller('Authors')
@ApiTags('Authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
  @Get()
  async getAllAuthors() {
    return this.authorService.getAllAuthors();
  }

  @Post()
  async addAuthor(@Body() data: CreateAuthorDto) {
    const add = await this.authorService.createAuthor(data);
    return add;
  }

  @Put()
  async updateAuthor(@Body() data: updateAuthorDto) {
    const add = await this.authorService.updateAuthor(data);
    return add;
  }

  @Delete(':AuthorId')
  async removeAuthor(@Param('AuthorId') AuthorId: string) {
    return this.authorService.deleteAuthor(AuthorId);
  }

  @Get(':AuthorId')
  async getOneAuthor(@Param('AuthorId') AuthorId: string) {
    return this.authorService.getAuthorById(AuthorId);
  }
}
