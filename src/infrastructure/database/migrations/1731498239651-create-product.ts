import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProduct1731498239651 implements MigrationInterface {
    name = 'CreateProduct1731498239651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "product" (
                "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(100) NOT NULL,
                "description" character varying(100) NOT NULL,
                "userUuid" uuid,
                "created_at" TIMESTAMP DEFAULT NOW(),
                "updated_at" TIMESTAMP DEFAULT NOW(),
                CONSTRAINT "PK_5e4c1fdaa5e514bb813e64457a7" PRIMARY KEY ("uuid"),
                CONSTRAINT "FK_userUuid" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE SET NULL
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
