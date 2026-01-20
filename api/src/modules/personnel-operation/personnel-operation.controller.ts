import { Controller, Get, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { PersonnelOperationService } from './personnel-operation.service';
import { PersonnelOperation } from '../../entities/personnel-operation.entity';

@Controller('personnel-operations')
export class PersonnelOperationController {
  constructor(private readonly operationService: PersonnelOperationService) {}

  @Post()
  create(@Body() createOperationDto: Partial<PersonnelOperation>) {
    return this.operationService.create(createOperationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.operationService.findOne(id);
  }

  @Get('employee/:employeeId')
  findAllForEmployee(@Param('employeeId', ParseUUIDPipe) employeeId: string) {
    return this.operationService.findAllForEmployee(employeeId);
  }
}