import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from '../../entities/employee.entity';

@Controller('employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }

    @Get()
    findAll() {
        return this.employeeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.employeeService.findOne(id);
    }

    @Post()
    create(@Body() createEmployeeDto: Partial<Employee>) {
        return this.employeeService.create(createEmployeeDto);
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateEmployeeDto: Partial<Employee>,
    ) {
        return this.employeeService.update(id, updateEmployeeDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.employeeService.remove(id);
    }

    @Get(':id/current-operation')
    getCurrentOperation(@Param('id', ParseUUIDPipe) id: string) {
        return this.employeeService.getCurrentOperation(id);
    }
}