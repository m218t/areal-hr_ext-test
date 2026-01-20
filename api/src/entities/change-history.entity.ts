import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('change_history')
export class ChangeHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  user_id: string | null;

  @Column({ type: 'varchar', length: 50 })
  entity_type: string;

  @Column({ type: 'uuid' })
  entity_id: string;

  @Column({ type: 'jsonb' })
  changed_fields: any;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  operation_timestamp: Date;
}