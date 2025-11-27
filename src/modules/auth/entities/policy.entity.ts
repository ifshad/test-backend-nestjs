import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

@Entity('Policy')
export class Policy {
  @ApiHideProperty()
  @IsOptional()
  @PrimaryColumn()
  id: number;

  @ApiProperty({ required: false })
  @Column({ type: 'nvarchar', length: 500, nullable: true })
  name?: string;

  @ApiProperty({ required: false })
  @Column({ type: 'varchar', length: 2000, nullable: true })
  description?: string;

  @ApiProperty({ required: false })
  @Column({ type: 'varchar', length: 200, nullable: true })
  effect?: string;

  @ApiProperty({ required: false })
  @Column({ type: 'nvarchar', nullable: true })
  target?: string;

  @ApiProperty({ required: false })
  @Column({ type: 'varchar', length: 200, nullable: true })
  algorithm?: string;

  @ApiProperty({ required: false })
  @Column({ type: 'nvarchar', nullable: true })
  meta?: string;

  @ApiProperty()
  @Column({ type: 'datetime', default: () => 'GETDATE()', nullable: true })
  created_at: Date;

  @ApiProperty()
  @Column({ type: 'datetime', default: () => 'GETDATE()', nullable: true })
  updated_at: Date;
}
