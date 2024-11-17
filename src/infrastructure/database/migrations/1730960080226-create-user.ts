import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1730960080226 implements MigrationInterface {
    name = 'CreateUser1730960080226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "first_name" character varying(50) NOT NULL,
                "last_name" character varying(50),
                "email" character varying(50) NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "UQ_first_name" UNIQUE ("first_name"),
                CONSTRAINT "PK_a95e949168be7b7ece1a2382fed" PRIMARY KEY ("uuid")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
