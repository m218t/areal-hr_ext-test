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
    // 5. Employee
    pgm.createTable('employees', {
        id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },
        first_name: { type: 'varchar(100)', notNull: true },
        last_name: { type: 'varchar(100)', notNull: true },
        patronymic: { type: 'varchar(100)' },

        birth_date: { type: 'date', notNull: true },

        passport_series: { type: 'varchar(10)', notNull: true },
        passport_number: { type: 'varchar(20)', notNull: true },
        passport_issue_date: { type: 'date', notNull: true },
        passport_division_code: { type: 'varchar(10)', notNull: true },
        passport_issued_by: { type: 'varchar(255)', notNull: true },

        registration_region: { type: 'varchar(100)', notNull: true },
        registration_city: { type: 'varchar(100)', notNull: true },
        registration_street: { type: 'varchar(100)', notNull: true },
        registration_house: { type: 'varchar(20)', notNull: true },
        registration_building: { type: 'varchar(20)' },
        registration_apartment: { type: 'varchar(20)' },

        created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
        updated_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
        deleted_at: { type: 'timestamp' }
    });

    pgm.createIndex('employees', ['passport_series', 'passport_number'], {
        unique: true,
        where: 'deleted_at IS NULL'
    });

    pgm.createTable('employee_files', {
        id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },
        employee_id: {
            type: 'uuid',
            notNull: true,
            references: 'employees(id)',
            onDelete: 'CASCADE'
        },
        name: { type: 'varchar(255)', notNull: true },
        file_path: { type: 'varchar(500)', notNull: true },
        created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
        updated_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
        deleted_at: { type: 'timestamp' }
    });

    pgm.createIndex('employee_files', 'employee_id');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('employee_files');
    pgm.dropTable('employees');
};