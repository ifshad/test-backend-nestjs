import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../entities/organizations.entity';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from '../dtos/organizations.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private repo: Repository<Organization>,
  ) {}

  async create(dto: CreateOrganizationDto) {
    const data = this.repo.create(dto);
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const data = await this.repo.findOne({ where: { id } });
    if (!data) throw new NotFoundException('Organization not found');
    return data;
  }

  async update(id: number, dto: UpdateOrganizationDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const data = await this.findOne(id);
    await this.repo.remove(data);
    return { deleted: true };
  }
}
