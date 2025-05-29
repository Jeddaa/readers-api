import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LogInDto } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/user/user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async Register(@Body() body: CreateUserDto) {
    return await this.authService.createUser(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async logIn(@Request() req, @Body() body: LogInDto) {
    try {
      return await this.authService.generateJwtToken(req.user);
    } catch (error) {
      throw error;
    }
  }
  async changePassword() {}
}
