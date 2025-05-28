import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
@Injectable()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async Register(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body);
  }
}
