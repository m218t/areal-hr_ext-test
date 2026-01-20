import { Entity, Column } from 'typeorm';
import { BaseEntityWithSoftDelete } from './base.entity';

@Entity('users')
export class User extends BaseEntityWithSoftDelete {
    @Column({ length: 100 })
    first_name: string;

    @Column({ length: 100 })
    last_name: string;

    @Column({ length: 100, nullable: true })
    patronymic: string;

    @Column({ unique: true, length: 50 })
    login: string;

    @Column()
    password_hash: string;

    @Column({ type: 'varchar', length: 20, default: 'hr_manager' })
    role: string;
}