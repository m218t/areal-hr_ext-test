import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangeHistory } from '../../entities/change-history.entity';

@Injectable()
export class ChangeHistoryService {
    constructor(
        @InjectRepository(ChangeHistory)
        private changeHistoryRepository: Repository<ChangeHistory>,
    ) { }

    async findAll(): Promise<ChangeHistory[]> {
        return this.changeHistoryRepository.find({
            order: { operation_timestamp: 'DESC' },
        });
    }

    async findByEntity(entityType: string, entityId: string): Promise<ChangeHistory[]> {
        return this.changeHistoryRepository.find({
            where: { entity_type: entityType, entity_id: entityId },
            order: { operation_timestamp: 'DESC' },
        });
    }

    async logChange(
        userId: string | null,
        entityType: string,
        entityId: string,
        changedFields: any,
    ): Promise<ChangeHistory> {
        const logEntry = this.changeHistoryRepository.create({
            user_id: userId,
            entity_type: entityType,
            entity_id: entityId,
            changed_fields: changedFields,
        });

        return this.changeHistoryRepository.save(logEntry);
    }
}