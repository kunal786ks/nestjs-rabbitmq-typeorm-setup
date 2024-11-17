import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInboxMessages1731406162588 implements MigrationInterface {
    name = 'CreateInboxMessages1731406162588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
                CREATE TABLE "inbox_message" (
                    "id" SERIAL NOT NULL,
                    "message_id" uuid NOT NULL,
                    "handler_name" character varying NOT NULL,
                    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                    "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                    CONSTRAINT "PK_3d5f25b0b6e66c8b77e3dfe029e" PRIMARY KEY ("id")
                )
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "inbox_message"`);
    }

}
