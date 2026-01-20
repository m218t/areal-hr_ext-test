import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeFile } from '../../entities/employee-file.entity';
import { Employee } from '../../entities/employee.entity';
import { EmployeeFileService } from './employee-file.service';
import { EmployeeFileController } from './employee-file.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeFile, Employee]),
  ],
  controllers: [EmployeeFileController],
  providers: [EmployeeFileService],
  exports: [EmployeeFileService],
})
export class EmployeeFileModule {}