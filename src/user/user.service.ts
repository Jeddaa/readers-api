import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { AuthService } from '../auth/auth.service';
import { Types } from 'mongoose';
import { LogInDto } from '../auth/auth.dto';

@Injectable()
export class UserService {
  constructor(
    // @Inject(forwardRef(() => AuthService))
    // private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(data: CreateUserDto) {
    const getUser = await this.userRepository.findOne({ email: data.email });
    if (getUser) {
      return {
        message: 'User already exists. Please log in to your account',
        data: getUser.toObject(),
      };
    }
    const newUser = await this.userRepository.createUser(data);
    return newUser.toObject();
  }

  /**
   * @desc: gets a user details for login
   * @returns: the user details including the password
   */
  async findUserLogin(data: LogInDto) {
    return await this.userRepository.findOneForLogIn({
      email: data.email,
    });
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({
      email: email,
    });
  }
  /**
   *
   * @param userId
   * @desc gets a user using the userid
   * @returns the user
   */
  async getUser(userId: Types.ObjectId) {
    const getUser = await this.userRepository.findUserById(userId);
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
  async updateUser(userId, updateData: UpdateUserDto) {
    const getUser = await this.userRepository.findUserById(
      Types.ObjectId.createFromHexString(userId),
    );
    if (!getUser) {
      throw new HttpException(
        { message: 'Could not get user. Please try again later' },
        HttpStatus.BAD_REQUEST,
      );
    }
    if ('password' in updateData) {
      throw new HttpException(
        { message: 'Password update is not allowed through this endpoint.' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const updateUser = await this.userRepository.updateOne(
      getUser._id,
      updateData,
    );
    if (!updateUser) {
      throw new HttpException(
        {
          message: 'Could not update user information. Please try again later',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return { message: 'User information updated', data: updateUser.toObject() };
  }
}
