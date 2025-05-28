import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { LogInDto } from './auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userservice: UserService,
  ) {}
  async getHashedPassword(password) {
    return 'test';
  }
  async login(data: LogInDto) {
    const getUser = await this.userservice.findUserLogin(data);
  }
}
