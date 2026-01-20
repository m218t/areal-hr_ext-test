import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Organization } from '../../organizations/entities/organization.entity';

@Entity('departments')
export class Department {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ length: 200 })
    name!: string;

    @Column({ type: 'text', nullable: true })
    comment?: string;

    @ManyToOne(() => Organization, { nullable: false })
    @JoinColumn({ name: 'organization_id' })
    organization!: Organization;

    @Column({ name: 'organization_id' })
    organizationId!: string;

    @ManyToOne(() => Department, { nullable: true })
    @JoinColumn({ name: 'parent_department_id' })
    parentDepartment?: Department;

    @Column({ name: 'parent_department_id', nullable: true })
    parentDepartmentId?: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt?: Date;
}