import { Entity, Column } from 'typeorm';
import { BaseEntityWithSoftDelete } from './base.entity';

@Entity('positions')
export class Position extends BaseEntityWithSoftDelete {
  @Column({ length: 200 })
  name: string;
}