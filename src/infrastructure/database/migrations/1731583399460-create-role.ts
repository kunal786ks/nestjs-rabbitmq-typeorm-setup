import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRole1731583399460 implements MigrationInterface {
    name = 'CreateRole1731583399460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying(200) NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_16fc336b9576146aa1f03fdc7c5" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "users_roles" ("role_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_c525e9373d63035b9919e578a9c" PRIMARY KEY ("role_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1cf664021f00b9cc1ff95e17de" ON "users_roles" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e4435209df12bc1f001e536017" ON "users_roles" ("user_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       
        await queryRunner.query(`DROP TABLE "users_roles"`);
        await queryRunner.query(`DROP TABLE "role"`);
      
    }

}
