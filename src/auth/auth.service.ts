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
import * as bcrypt from 'bcrypt';
import { get } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userservice: UserService,
  ) {}
  async getHashedPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  async comparePassword(password: string, hashedPass: string) {
    return bcrypt.compareSync(password, hashedPass);
  }

  async validateUser(data: LogInDto) {
    const getUser = await this.userservice.findUserLogin(data);
    console.log('getUser', getUser.password);
    if (!getUser) {
      throw new HttpException(
        { message: 'Invalid login Details' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const isMatch = this.comparePassword(data.password, getUser.password);
    console.log('isMatch', isMatch);
    if (!isMatch) {
      throw new HttpException(
        { message: 'Invalid login Details' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(data: LogInDto) {
    try {
      const getUser = await this.userservice.findUserLogin(data);
    } catch (error) {
      console.log('@@@@@@log in error@@@@@@@@@', error);
      throw new HttpException(
        { message: 'Internal server error' },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
