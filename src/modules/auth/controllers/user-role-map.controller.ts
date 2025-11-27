import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserRoleMapService } from '../services/user-role-map.service';
import {
  CreateUserRoleMapDto,
  UpdateUserRoleMapDto,
} from '../dtos/user-role-map.dto';

@ApiTags('User Role Mapping')
@Controller('user-role-map')
export class UserRoleMapController {
  constructor(private readonly service: UserRoleMapService) {}

  @Post()
  @ApiOperation({ summary: 'Assign role to user' })
  create(@Body() dto: CreateUserRoleMapDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user-role mappings' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one user-role mapping' })
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user-role mapping' })
  update(@Param('id') id: number, @Body() dto: UpdateUserRoleMapDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user-role mapping' })
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
