import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Organization } from './organizations.entity';
import { UserRoleMap } from './user-role-map.entity';
import { IsOptional } from 'class-validator';

@Entity('users')
export class User {
  @ApiHideProperty()
  @IsOptional()
  @PrimaryColumn()
  id: number;

  @ApiProperty({ required: false })
  @Column({ type: 'nchar', length: 255, nullable: true })
  name?: string;

  @ApiProperty()
  @PrimaryColumn({ type: 'varchar', length: 50 })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  password: string;

  @ApiProperty()
  @Column({ type: 'datetime', default: () => 'GETDATE()', nullable: true })
  created_at: Date;

  @ApiProperty()
  @Column({ type: 'datetime', default: () => 'GETDATE()', nullable: true })
  updated_at: Date;

  @ApiProperty()
  @Column()
  organization_id: number;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @OneToMany(() => UserRoleMap, (urm) => urm.user)
  userRoles: UserRoleMap[];
}
