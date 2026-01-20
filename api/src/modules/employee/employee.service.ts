import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Employee } from '../../entities/employee.entity';
import { EmployeeFile } from '../../entities/employee-file.entity';
import { PersonnelOperation } from '../../entities/personnel-operation.entity';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
        @InjectRepository(EmployeeFile)
        private employeeFileRepository: Repository<EmployeeFile>,
        @InjectRepository(PersonnelOperation)
        private operationRepository: Repository<PersonnelOperation>,
    ) { }

    async findAll(): Promise<Employee[]> {
        return this.employeeRepository.find({
            where: { deleted_at: IsNull() },
            relations: ['files'],
        });
    }

    async findOne(id: string): Promise<Employee> {
        const employee = await this.employeeRepository.findOne({
            where: { id, deleted_at: IsNull() },
            relations: ['files', 'operations'],
        });

        if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }

        return employee;
    }

    async create(employeeData: Partial<Employee>): Promise<Employee> {
        const employee = this.employeeRepository.create(employeeData);
        return this.employeeRepository.save(employee);
    }

    async update(id: string, updateData: Partial<Employee>): Promise<Employee> {
        const employee = await this.findOne(id);
        Object.assign(employee, updateData);
        return this.employeeRepository.save(employee);
    }

    async remove(id: string): Promise<void> {
        await this.employeeRepository.softDelete(id);
    }

    async getCurrentOperation(employeeId: string): Promise<PersonnelOperation | null> {
        const operations = await this.operationRepository.find({
            where: { employee_id: employeeId },
            order: { effective_date: 'DESC', created_at: 'DESC' },
            take: 1,
        });

        return operations.length > 0 ? operations[0] : null;
    }
}