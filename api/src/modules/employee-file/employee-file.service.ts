import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { EmployeeFile } from '../../entities/employee-file.entity';
import { Employee } from '../../entities/employee.entity';

@Injectable()
export class EmployeeFileService {
    constructor(
        @InjectRepository(EmployeeFile)
        private fileRepository: Repository<EmployeeFile>,
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
    ) { }

    async findAllForEmployee(employeeId: string): Promise<EmployeeFile[]> {
        return this.fileRepository
            .createQueryBuilder('file')
            .where('file.employee_id = :employeeId', { employeeId })
            .andWhere('file.deleted_at IS NULL')
            .getMany();
    }

    async findOne(id: string): Promise<EmployeeFile> {
        const file = await this.fileRepository.findOne({
            where: { id, deleted_at: IsNull() },
        });

        if (!file) {
            throw new NotFoundException(`File with ID ${id} not found`);
        }

        return file;
    }

    async create(
        employeeId: string,
        fileData: { name: string; file_path: string },
    ): Promise<EmployeeFile> {
        const employee = await this.employeeRepository
            .createQueryBuilder('employee')
            .where('employee.id = :employeeId', { employeeId })
            .andWhere('employee.deleted_at IS NULL')
            .getOne();

        if (!employee) {
            throw new NotFoundException(`Employee with ID ${employeeId} not found`);
        }

        const file = this.fileRepository.create({
            ...fileData,
            employee_id: employeeId,
        });

        return this.fileRepository.save(file);
    }

    async remove(id: string): Promise<void> {
        await this.fileRepository.softDelete(id);
    }
}