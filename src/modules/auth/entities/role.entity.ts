import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { UserRoleMap } from './user-role-map.entity';
import { IsOptional } from 'class-validator';

@Entity('role')
export class Role {
  @ApiHideProperty()
  @IsOptional()
  @PrimaryColumn()
  id: number;

  @ApiProperty({ required: false })
  @Column({ type: 'varchar', length: 150, nullable: true })
  name?: string;

  @ApiProperty()
  @Column({ type: 'datetime', default: () => 'GETDATE()', nullable: true })
  created_at: Date;

  @ApiProperty()
  @Column({ type: 'datetime', default: () => 'GETDATE()', nullable: true })
  updated_at: Date;

  @OneToMany(() => UserRoleMap, (urm) => urm.role)
  userRoles: UserRoleMap[];
}
