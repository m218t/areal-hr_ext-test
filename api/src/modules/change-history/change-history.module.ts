import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChangeHistory } from '../../entities/change-history.entity';
import { ChangeHistoryService } from './change-history.service';
import { ChangeHistoryController } from './change-history.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([ChangeHistory]),
    ],
    controllers: [ChangeHistoryController],
    providers: [ChangeHistoryService],
    exports: [TypeOrmModule, ChangeHistoryService],
})
export class ChangeHistoryModule { }