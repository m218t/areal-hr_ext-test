/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('change_history', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },
    user_id: { 
      type: 'uuid', 
      references: 'users(id)',
      onDelete: 'SET NULL'
    },
    entity_type: { 
      type: 'varchar(50)', 
      notNull: true,
      check: "entity_type IN ('Organization', 'Department', 'Position', 'Employee', 'PersonnelOperation', 'EmployeeFile')"
    },
    entity_id: { type: 'uuid', notNull: true },
    changed_fields: { type: 'jsonb', notNull: true },
    operation_timestamp: { 
      type: 'timestamptz', 
      notNull: true, 
      default: pgm.func('current_timestamp') 
    }
  });

  pgm.createIndex('change_history', 'user_id');
  pgm.createIndex('change_history', ['entity_type', 'entity_id']);
  pgm.createIndex('change_history', 'operation_timestamp');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('change_history');
};