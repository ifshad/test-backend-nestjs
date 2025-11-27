import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsDateString,
  IsInt,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  created_at?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  updated_at?: Date;

  @ApiProperty()
  @IsInt()
  organization_id: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
