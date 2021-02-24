import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateRolesTable1613973054208 implements MigrationInterface {
    private table = new Table({
        name: 'roles',
        columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
                name: 'name',
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

    private extension_ossp = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'


    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(this.extension_ossp); // ativa extensa ossp para funcionalidade uuid
        await queryRunner.createTable(this.table); // cria a tabela
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.table); // delete tabele
        await queryRunner.query(this.extension_ossp); // desativa a extensão
    }

}
