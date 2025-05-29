import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsPositive,
  Max,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @Max(new Date().getFullYear())
  @IsNotEmpty()
  year: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  authorId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ minimum: 1, maximum: 5 })
  @Min(0)
  @Max(5)
  @IsNumber()
  @IsNotEmpty()
  ratings: number;
}

export class UpdateBookDto extends CreateBookDto {
  // @ApiProperty()
  // @IsString()
  // @IsNotEmpty()
  // bookId: string;
  // @ApiProperty()
  // @IsString()
  // @IsNotEmpty()
  // title: string;
  // @ApiProperty()
  // @IsInt()
  // @IsPositive()
  // @Max(new Date().getFullYear())
  // @IsNotEmpty()
  // year: number;
  // @ApiProperty()
  // @IsString()
  // @IsNotEmpty()
  // authorId: string;
}
