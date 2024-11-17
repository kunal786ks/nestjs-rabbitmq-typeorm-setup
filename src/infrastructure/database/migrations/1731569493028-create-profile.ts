import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProfile1731569493028 implements MigrationInterface {
    name = 'CreateProfile1731569493028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profile" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "bio" character varying(100) NOT NULL, "user" uuid, CONSTRAINT "REL_357253422d552135cd57d264ec" UNIQUE ("user"), CONSTRAINT "PK_fab5f83a1cc8ebe0076c733fd85" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_357253422d552135cd57d264ecc" FOREIGN KEY ("user") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "profile"`);
    }

}
