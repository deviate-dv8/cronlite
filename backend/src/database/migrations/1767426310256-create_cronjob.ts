import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCronjob1767426310256 implements MigrationInterface {
    name = 'CreateCronjob1767426310256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."cronjob_method_enum" AS ENUM('GET', 'POST', 'PUT', 'DELETE', 'PATCH')`);
        await queryRunner.query(`CREATE TABLE "cronjob" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "url" character varying NOT NULL, "schedule" character varying NOT NULL DEFAULT '*/30 * * * * *', "timeout_ms" integer NOT NULL DEFAULT '30000', "enabled" boolean NOT NULL DEFAULT true, "method" "public"."cronjob_method_enum" NOT NULL DEFAULT 'GET', "httpUsername" character varying, "httpPassword" character varying, "httpHeaders" jsonb, "userId" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_743ffd6c2eb7ed6ef66199d6dec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cronjob" ADD CONSTRAINT "FK_133ef2a5ea82b43d2c0746f77b8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cronjob" DROP CONSTRAINT "FK_133ef2a5ea82b43d2c0746f77b8"`);
        await queryRunner.query(`DROP TABLE "cronjob"`);
        await queryRunner.query(`DROP TYPE "public"."cronjob_method_enum"`);
    }

}
