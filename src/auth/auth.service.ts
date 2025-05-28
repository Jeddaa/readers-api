import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { LogInDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}
  async getHashedPassword(password) {
    return 'test';
  }
  async login(data: LogInDto) {
    const getUser = await this.userRepository.findOneForLogIn({
      email: data.email,
    });
    if (!getUser) {
      throw new HttpException(
        { message: 'Invalid login Details' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
