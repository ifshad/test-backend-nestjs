import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsDateString, IsOptional } from 'class-validator';

export class CreateUserRoleMapDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsInt()
  user_id: number;

  @ApiProperty()
  @IsInt()
  role_id: number;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  created_at?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  updated_at?: Date;
}

export class UpdateUserRoleMapDto extends PartialType(CreateUserRoleMapDto) {}
