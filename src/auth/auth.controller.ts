import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LogInDto } from './auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  @Post('/login')
  async logIn(@Body() body: LogInDto) {
    try {
    } catch (error) {}
  }
  async changePassword() {}
}
