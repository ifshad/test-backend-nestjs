import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

@Entity('organizations')
export class Organization {
  @ApiHideProperty()
  @IsOptional()
  @PrimaryColumn()
  id: number;

  @ApiProperty({ required: false })
  @Column({ type: 'varchar', length: 500, nullable: true })
  name?: string;

  @ApiProperty({ required: false })
  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @ApiProperty({ required: false })
  @Column({ type: 'varchar', length: 2500, nullable: true })
  address?: string;

  @ApiProperty()
  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  created_at: Date;

  @ApiProperty()
  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  updated_at: Date;
}
