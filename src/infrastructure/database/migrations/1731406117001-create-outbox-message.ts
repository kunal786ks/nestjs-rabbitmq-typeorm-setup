import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOutboxMessage1731406117001 implements MigrationInterface {
    name = 'CreateOutboxMessage1731406117001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
                CREATE TYPE "public"."outbox_message_status_enum" AS ENUM('sent', 'pending');
                CREATE TABLE "outbox_message" (
                    "id" SERIAL NOT NULL,
                    "message_id" uuid NOT NULL,
                    "type" character varying(255) NOT NULL,
                    "headers" json NOT NULL,
                    "properties" json NOT NULL,
                    "body" json NOT NULL,
                    "status" "public"."outbox_message_status_enum" NOT NULL DEFAULT 'pending',
                    "sent_at" TIMESTAMP,
                    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                    "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                    CONSTRAINT "PK_3d8d56b4b6e66c8b77e3dfe029f" PRIMARY KEY ("id"),
                    CONSTRAINT "UQ_message_id" UNIQUE ("message_id")
                )
            `);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "outbox_message"`);
        await queryRunner.query(`DROP TYPE "public"."outbox_message_status_enum"`);
      }

}
