import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Department } from './entities/department.entity';
import { Organization } from '../organizations/entities/organization.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
    @InjectRepository(Organization)
    private organizationsRepository: Repository<Organization>,
  ) { }

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const organization = await this.organizationsRepository.findOne({
      where: { id: createDepartmentDto.organizationId, deletedAt: IsNull() }
    });
    if (!organization) {
      throw new BadRequestException('Organization not found');
    }

    if (createDepartmentDto.parentDepartmentId) {
      const parentDept = await this.departmentsRepository.findOne({
        where: {
          id: createDepartmentDto.parentDepartmentId,
          deletedAt: IsNull(),
          organizationId: createDepartmentDto.organizationId
        }
      });
      if (!parentDept) {
        throw new BadRequestException('Parent department not found or belongs to different organization');
      }
    }

    const department = this.departmentsRepository.create(createDepartmentDto);
    return await this.departmentsRepository.save(department);
  }

  async findAll(): Promise<Department[]> {
    return await this.departmentsRepository.find({
      where: { deletedAt: IsNull() },
      relations: ['organization', 'parentDepartment'],
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: string): Promise<Department> {
    const department = await this.departmentsRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['organization', 'parentDepartment']
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    return department;
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
    const department = await this.findOne(id);

    if (updateDepartmentDto.organizationId && updateDepartmentDto.organizationId !== department.organizationId) {
      const organization = await this.organizationsRepository.findOne({
        where: { id: updateDepartmentDto.organizationId, deletedAt: IsNull() }
      });
      if (!organization) {
        throw new BadRequestException('New organization not found');
      }
    }

    if (updateDepartmentDto.parentDepartmentId !== undefined) {
      if (updateDepartmentDto.parentDepartmentId === null) {
      } else if (updateDepartmentDto.parentDepartmentId !== department.parentDepartmentId) {
        const parentDept = await this.departmentsRepository.findOne({
          where: {
            id: updateDepartmentDto.parentDepartmentId,
            deletedAt: IsNull(),
            organizationId: updateDepartmentDto.organizationId || department.organizationId
          }
        });
        if (!parentDept) {
          throw new BadRequestException('Parent department not found or belongs to different organization');
        }
      }
    }

    Object.assign(department, updateDepartmentDto);
    department.updatedAt = new Date();

    return await this.departmentsRepository.save(department);
  }

  async remove(id: string): Promise<void> {
    const department = await this.findOne(id);
    department.deletedAt = new Date();
    await this.departmentsRepository.save(department);
  }
}