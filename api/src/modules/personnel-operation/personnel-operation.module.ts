import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonnelOperation } from '../../entities/personnel-operation.entity';
import { Employee } from '../../entities/employee.entity';
import { PersonnelOperationService } from './personnel-operation.service';
import { PersonnelOperationController } from './personnel-operation.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonnelOperation, Employee]),
  ],
  controllers: [PersonnelOperationController],
  providers: [PersonnelOperationService],
  exports: [PersonnelOperationService],
})
export class PersonnelOperationModule {}