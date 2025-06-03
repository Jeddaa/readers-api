import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateAuthorDto, UpdateAuthorDto } from './author.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/auth.types';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('authors')
@ApiTags('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
  @Get()
  async getAllAuthors() {
    return this.authorService.getAllAuthors();
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'create an author',
  })
  @Post()
  async addAuthor(@Request() req, @Body() data: CreateAuthorDto) {
    const add = await this.authorService.createAuthor(req.user, data);
    return add;
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Update an author',
  })
  @Put('/update/:authorId')
  async updateAuthor(
    @Request() req,
    @Body() data: UpdateAuthorDto,
    @Param('authorId') authorId: string,
  ) {
    return await this.authorService.updateAuthor(req.user, data, authorId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Delete an author',
  })
  @Delete(':AuthorId')
  async removeAuthor(@Request() req, @Param('AuthorId') AuthorId: string) {
    return this.authorService.deleteAuthor(req.user._id, AuthorId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get an author',
  })
  @Get(':AuthorId')
  async getOneAuthor(@Param('AuthorId') AuthorId: string) {
    return this.authorService.getAuthorById(AuthorId);
  }
}
