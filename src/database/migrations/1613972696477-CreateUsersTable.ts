import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateUsersTable1613972696477 implements MigrationInterface {

    private table = new Table({
        name: 'users',
        columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
                name: 'email',
                type: 'varchar',
                isUnique: true,
            },
            {
                name: 'name',
                type: 'varchar',
            },
            {
                name: 'password',
                type: 'varchar',
            },
            {
                name: 'created_at',
                type: 'timestamptz',
                isPrimary: false,
                isNullable: false,
                default: 'now()'
            },
            {
                name: 'updated_at',
                type: 'timestamptz',
                isPrimary: false,
                isNullable: false,
                default: 'now()'
            }

        ]
    });

    private extension_ossp = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(this.extension_ossp);
        await queryRunner.createTable(this.table);        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.table);
        await queryRunner.query(this.extension_ossp);
    }

}
