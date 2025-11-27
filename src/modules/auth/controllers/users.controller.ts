import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users (with organization & roles)' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':email')
  @ApiOperation({ summary: 'Get a user by email' })
  findOne(@Param('email') email: string) {
    return this.service.findOne(email);
  }

  @Patch(':email')
  @ApiOperation({ summary: 'Update a user' })
  update(@Param('email') email: string, @Body() dto: UpdateUserDto) {
    return this.service.update(email, dto);
  }

  @Delete(':email')
  @ApiOperation({ summary: 'Delete a user' })
  remove(@Param('email') email: string) {
    return this.service.remove(email);
  }
}
