import {
  Get,
  Controller,
  Request,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
@Injectable()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get profile for a user',
    // type: DoctorNoteResponseDto,
  })
  @Get('/profile')
  async getProfile(@Request() req) {
    console.log('user', req.user);
    return await this.userService.getUser(req.user._id);
  }
}
