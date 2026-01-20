import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntityWithSoftDelete } from './base.entity';
import { Organization } from './organization.entity';

@Entity('departments')
export class Department extends BaseEntityWithSoftDelete {
  @Column({ length: 200 })
  name: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'uuid', nullable: true })
  parent_department_id: string;

  @Column({ type: 'text', nullable: true })
  comment: string;

  // Связи
  @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @ManyToOne(() => Department, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'parent_department_id' })
  parent_department: Department;

  @OneToMany(() => Department, department => department.parent_department)
  children_departments: Department[];
}