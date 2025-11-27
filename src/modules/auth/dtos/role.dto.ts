import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  created_at?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  updated_at?: Date;
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
