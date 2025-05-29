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
import { CreateUserDto } from 'src/user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    // @Inject(forwardRef(() => UserService))
    private readonly userservice: UserService,
  ) {}
  async getHashedPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  private async comparePassword(password: string, hashedPass: string) {
    return bcrypt.compareSync(password, hashedPass);
  }

  async createUser(data: CreateUserDto) {
    const getUser = await this.userservice.findUserByEmail(data.email);
    if (getUser) {
      return {
        message: 'User already exists. Please log in to your account',
        data: getUser.toObject(),
      };
    }
    const getHashedPassword = await this.getHashedPassword(data.password);
    data.password = getHashedPassword;
    return await this.userservice.createUser(data);
  }

  async validateUser(data: LogInDto) {
    const getUser = await this.userservice.findUserLogin(data);
    if (!getUser) {
      throw new HttpException(
        { message: 'Invalid login Details' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const isMatch = this.comparePassword(data.password, getUser.password);
    if (!isMatch) {
      throw new HttpException(
        { message: 'Invalid login Details' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return getUser.toObject();
  }

  // async login(data: LogInDto) {
  //   try {
  //     const getUser = await this.userservice.findUserLogin(data);
  //   } catch (error) {
  //     console.log('@@@@@@log in error@@@@@@@@@', error);
  //     throw new HttpException(
  //       { message: 'Internal server error' },
  //       HttpStatus.SERVICE_UNAVAILABLE,
  //     );
  //   }
  // }
  async login(user) {
    const payload = { email: user.email, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
