import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreatePolicyDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  effect?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  target?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  algorithm?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  meta?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  created_at?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  updated_at?: Date;
}

export class UpdatePolicyDto extends PartialType(CreatePolicyDto) {}
