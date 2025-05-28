import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LogInDto } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async logIn(@Request() req, @Body() body: LogInDto) {
    try {
      console.log('req user', req.user);
      return req.user;
    } catch (error) {
      throw error;
    }
    // return await this.authService.login(body);
  }
  async changePassword() {}
}
