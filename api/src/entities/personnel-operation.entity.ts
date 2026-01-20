import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Employee } from './employee.entity';

@Entity('personnel_operations')
export class PersonnelOperation {
  @PrimaryColumn({ type: 'uuid', default: () => 'gen_random_uuid()' })
  id: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @Column({ 
    type: 'varchar', 
    length: 50
  })
  operation_type: string;

  @Column({ type: 'uuid', nullable: true })
  department_id: string;

  @Column({ type: 'uuid', nullable: true })
  position_id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salary: number;

  @Column({ type: 'date' })
  effective_date: Date;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Employee, employee => employee.operations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}