export const up = (pgm) => {
    pgm.createTable('departments', {
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
        organization_id: {
            type: 'uuid',
            notNull: true
        },
        parent_department_id: {
            type: 'uuid'
        },
        comment: {
            type: 'text'
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

    // Внешний ключ на organizations
    pgm.addConstraint('departments', 'fk_departments_organization', {
        foreignKeys: {
            columns: 'organization_id',
            references: 'organizations(id)',
            onDelete: 'RESTRICT'
        }
    });

    // Внешний ключ на себя (иерархия)
    pgm.addConstraint('departments', 'fk_departments_parent', {
        foreignKeys: {
            columns: 'parent_department_id',
            references: 'departments(id)',
            onDelete: 'SET NULL'
        }
    });

    // Индексы
    pgm.createIndex('departments', 'deleted_at');
    pgm.createIndex('departments', 'organization_id');
    pgm.createIndex('departments', 'parent_department_id');
};

export const down = (pgm) => {
    pgm.dropConstraint('departments', 'fk_departments_organization');
    pgm.dropConstraint('departments', 'fk_departments_parent');
    pgm.dropTable('departments');
};