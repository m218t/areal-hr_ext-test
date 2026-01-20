export const up = (pgm) => {
    pgm.createTable('users', {
        id: {
            type: 'uuid',
            primaryKey: true,
            default: pgm.func('gen_random_uuid()'),
            notNull: true
        },
        first_name: {
            type: 'varchar(100)',
            notNull: true
        },
        last_name: {
            type: 'varchar(100)',
            notNull: true
        },
        patronymic: {
            type: 'varchar(100)'
        },
        login: {
            type: 'varchar(50)',
            notNull: true,
            unique: true
        },
        password_hash: {
            type: 'varchar(255)',
            notNull: true
        },
        role: {
            type: 'varchar(20)',
            notNull: true
        },
        created_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp')
        },
        updated_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp')
        },
        deleted_at: {
            type: 'timestamptz'
        }
    });

    pgm.addConstraint('users', 'users_role_check', {
        check: "role IN ('admin', 'hr_manager')"
    });

    pgm.createIndex('users', 'deleted_at');
    pgm.createIndex('users', 'login');
};

export const down = (pgm) => {
    pgm.dropTable('users');
};