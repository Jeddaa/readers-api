import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @ApiProperty({ minLength: 6 })
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password'] as const),
) {}

export class UpdatePasswordDto {
  @IsString()
  @ApiProperty({ minLength: 6 })
  @MinLength(6)
  @IsNotEmpty()
  newPassword: string;
}
