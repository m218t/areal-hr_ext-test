import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntityWithSoftDelete } from './base.entity';
import { Department } from './department.entity';

@Entity('organizations')
export class Organization extends BaseEntityWithSoftDelete {
  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @OneToMany(() => Department, department => department.organization)
  departments: Department[];
}