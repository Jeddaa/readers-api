import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { AuthService } from 'src/auth/auth.service';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async createUser(data: CreateUserDto) {
    const getUser = await this.userRepository.findOne({ email: data.email });
    if (getUser) {
      return {
        message: 'User already exists. Please log in to your account',
        data: getUser,
      };
    }
    const getHashedPassword = await this.authService.getHashedPassword(
      data.password,
    );
    data.password = getHashedPassword;
    const newUser = await this.userRepository.createUser(data);
    return newUser;
  }

  /**
   *
   * @param userId
   * @desc gets a user using the userid
   * @returns the user
   */
  async getUser(userId: string) {
    const getUser = await this.userRepository.findUserById(
      Types.ObjectId.createFromHexString(userId),
    );
    if (!getUser) {
      throw new HttpException(
        { message: 'Could not get user. Please try again later' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return { message: 'successful', data: getUser };
  }

  /**
   * @desc updates data in a user document
   * @returns the update document/user
   */
  async updateUser(userId, data: UpdateUserDto) {
    const getUser = await this.userRepository.findUserById(
      Types.ObjectId.createFromHexString(userId),
    );
    if (!getUser) {
      throw new HttpException(
        { message: 'Could not get user. Please try again later' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
