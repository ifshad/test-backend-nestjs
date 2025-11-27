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
import { PolicyService } from '../services/policy.service';
import { CreatePolicyDto, UpdatePolicyDto } from '../dtos/policy.dto';

@ApiTags('Policy')
@Controller('policies')
export class PolicyController {
  constructor(private readonly service: PolicyService) {}

  @Post()
  @ApiOperation({ summary: 'Create policy' })
  create(@Body() dto: CreatePolicyDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all policies' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one policy' })
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update policy' })
  update(@Param('id') id: number, @Body() dto: UpdatePolicyDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete policy' })
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
