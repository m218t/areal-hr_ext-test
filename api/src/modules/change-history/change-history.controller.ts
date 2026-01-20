import { Controller, Get, Param } from '@nestjs/common';
import { ChangeHistoryService } from './change-history.service';

@Controller('change-history')
export class ChangeHistoryController {
    constructor(private readonly changeHistoryService: ChangeHistoryService) { }

    @Get()
    findAll() {
        return this.changeHistoryService.findAll();
    }

    @Get(':entityType/:entityId')
    findByEntity(
        @Param('entityType') entityType: string,
        @Param('entityId') entityId: string,
    ) {
        return this.changeHistoryService.findByEntity(entityType, entityId);
    }
}