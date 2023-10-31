import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateLanguagesTable1698675290622 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'languages',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            isUnique: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'language_code',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'default',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('languages');
  }
}
