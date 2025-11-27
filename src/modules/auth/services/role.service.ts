import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from '../dtos/role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private repo: Repository<Role>,
  ) {}

  create(dto: CreateRoleDto) {
    const role = this.repo.create(dto);
    return this.repo.save(role);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const role = await this.repo.findOne({ where: { id } });
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }

  async update(id: number, dto: UpdateRoleDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const role = await this.findOne(id);
    await this.repo.remove(role);
    return { deleted: true };
  }
}
