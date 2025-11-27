import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policy } from '../entities/policy.entity';
import { CreatePolicyDto, UpdatePolicyDto } from '../dtos/policy.dto';

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy)
    private repo: Repository<Policy>,
  ) {}

  create(dto: CreatePolicyDto) {
    const data = this.repo.create(dto);
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const data = await this.repo.findOne({ where: { id } });
    if (!data) throw new NotFoundException('Policy not found');
    return data;
  }

  async update(id: number, dto: UpdatePolicyDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const data = await this.findOne(id);
    await this.repo.remove(data);
    return { deleted: true };
  }
}
