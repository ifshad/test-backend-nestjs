import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  create(dto: CreateUserDto) {
    const user = this.repo.create(dto);
    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find({
      relations: ['organization', 'userRoles', 'userRoles.role'],
    });
  }

  async findOne(email: string) {
    const user = await this.repo.findOne({
      where: { email },
      relations: ['organization', 'userRoles', 'userRoles.role'],
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(email: string, dto: UpdateUserDto) {
    await this.repo.update(email, dto);
    return this.findOne(email);
  }

  async remove(email: string) {
    const user = await this.findOne(email);
    await this.repo.remove(user);
    return { deleted: true };
  }
}
