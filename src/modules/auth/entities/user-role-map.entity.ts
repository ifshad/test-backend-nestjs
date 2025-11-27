import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Role } from './role.entity';
import { User } from './users.entity';
import { IsOptional } from 'class-validator';

@Entity('user_role_map')
export class UserRoleMap {
  @ApiHideProperty()
  @IsOptional()
  @PrimaryColumn()
  id: number;

  @ApiProperty()
  @Column()
  user_id: number;

  @ApiProperty()
  @Column()
  role_id: number;

  @ApiProperty()
  @Column({ type: 'datetime', default: () => 'GETDATE()', nullable: true })
  created_at: Date;

  @ApiProperty()
  @Column({ type: 'datetime', default: () => 'GETDATE()', nullable: true })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.userRoles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Role, (role) => role.userRoles)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
