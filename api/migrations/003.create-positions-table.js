export const up = (pgm) => {
    pgm.createTable('positions', {
        id: {
            type: 'uuid',
            primaryKey: true,
            default: pgm.func('gen_random_uuid()'),
            notNull: true
        },
        name: {
            type: 'varchar(200)',
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

    pgm.createIndex('positions', 'deleted_at');
};

export const down = (pgm) => {
    pgm.dropTable('positions');
};