import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePurchasings1672840695231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "purchasings",
                columns: [
                    {
                        name: 'id',
                        type: 'int(11)',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'total',
                        type: 'numeric',
                    },
                    {
                        name: 'payment_type',
                        type: 'varchar(64)',
                    },
                    {
                        name: 'status',
                        type: 'varchar(32)',
                    },
                    {
                        name: 'id_product',
                        type: 'int(11)',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        isNullable: true
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        isNullable: true
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKPurchasingsProducts',
                        referencedTableName: 'products',
                        referencedColumnNames: ['id'],
                        columnNames: ['id_product'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('purchasings');
    }

}
