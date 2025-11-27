import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRoleMap } from '../entities/user-role-map.entity';
import {
  CreateUserRoleMapDto,
  UpdateUserRoleMapDto,
} from '../dtos/user-role-map.dto';

@Injectable()
export class UserRoleMapService {
  constructor(
    @InjectRepository(UserRoleMap)
    private repo: Repository<UserRoleMap>,
  ) {}

  create(dto: CreateUserRoleMapDto) {
    const data = this.repo.create(dto);
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find({
      relations: ['user', 'role'],
    });
  }

  async findOne(id: number) {
    const data = await this.repo.findOne({
      where: { id },
      relations: ['user', 'role'],
    });
    if (!data) throw new NotFoundException('User role mapping not found');
    return data;
  }

  async update(id: number, dto: UpdateUserRoleMapDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const data = await this.findOne(id);
    await this.repo.remove(data);
    return { deleted: true };
  }
}
