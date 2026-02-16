import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedIsEmailVerifiedOnUser1769763400635 implements MigrationInterface {
    name = 'AddedIsEmailVerifiedOnUser1769763400635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isEmailVerified" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isEmailVerified"`);
    }

}
