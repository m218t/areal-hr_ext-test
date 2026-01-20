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
    pgm.createTable('personnel_operations', {
        id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },
        employee_id: {
            type: 'uuid',
            notNull: true,
            references: 'employees(id)',
            onDelete: 'CASCADE'
        },
        operation_type: {
            type: 'varchar(50)',
            notNull: true,
            check: "operation_type IN ('hire', 'salary_change', 'transfer', 'dismissal')"
        },
        department_id: {
            type: 'uuid',
            references: 'departments(id)',
            onDelete: 'SET NULL'
        },
        position_id: {
            type: 'uuid',
            references: 'positions(id)',
            onDelete: 'SET NULL'
        },
        salary: { type: 'decimal(10,2)' },
        effective_date: { type: 'date', notNull: true },
        comment: { type: 'text' },
        created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') }
    });

    pgm.createIndex('personnel_operations', 'employee_id');
    pgm.createIndex('personnel_operations', 'department_id');
    pgm.createIndex('personnel_operations', 'position_id');
    pgm.createIndex('personnel_operations', 'effective_date');
    pgm.createIndex('personnel_operations', ['employee_id', 'effective_date']);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('personnel_operations');
};