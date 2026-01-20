import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonnelOperation } from '../../entities/personnel-operation.entity';
import { Employee } from '../../entities/employee.entity';

@Injectable()
export class PersonnelOperationService {
  constructor(
    @InjectRepository(PersonnelOperation)
    private operationRepository: Repository<PersonnelOperation>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(operationData: Partial<PersonnelOperation>): Promise<PersonnelOperation> {
    const operation = this.operationRepository.create(operationData);
    return this.operationRepository.save(operation);
  }

  async findAllForEmployee(employeeId: string): Promise<PersonnelOperation[]> {
    return this.operationRepository
      .createQueryBuilder('operation')
      .where('operation.employee_id = :employeeId', { employeeId })
      .orderBy('operation.effective_date', 'DESC')
      .getMany();
  }

  async findOne(id: string): Promise<PersonnelOperation> {
    const operation = await this.operationRepository.findOne({
      where: { id },
    });
    
    if (!operation) {
      throw new NotFoundException(`Operation with ID ${id} not found`);
    }
    
    return operation;
  }
}