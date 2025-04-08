import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Max,
  IsInt,
} from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Max(new Date().getFullYear())
  birthYear: number;
}

export class updateAuthorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  authorId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Max(new Date().getFullYear())
  birthYear: number;
}
