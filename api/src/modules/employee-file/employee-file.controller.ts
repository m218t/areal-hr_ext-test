import { Controller, Get, Post, Delete, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { EmployeeFileService } from './employee-file.service';

@Controller('employees/:employeeId/files')
export class EmployeeFileController {
  constructor(private readonly fileService: EmployeeFileService) {}

  @Get()
  findAll(@Param('employeeId', ParseUUIDPipe) employeeId: string) {
    return this.fileService.findAllForEmployee(employeeId);
  }

  @Get(':fileId')
  findOne(
    @Param('employeeId', ParseUUIDPipe) employeeId: string,
    @Param('fileId', ParseUUIDPipe) fileId: string,
  ) {
    return this.fileService.findOne(fileId);
  }

  @Post()
  create(
    @Param('employeeId', ParseUUIDPipe) employeeId: string,
    @Body() createFileDto: { name: string; file_path: string },
  ) {
    return this.fileService.create(employeeId, createFileDto);
  }

  @Delete(':fileId')
  remove(@Param('fileId', ParseUUIDPipe) fileId: string) {
    return this.fileService.remove(fileId);
  }
}