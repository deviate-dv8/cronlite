import { Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/browser';
import configuration from './configuration';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): DataSourceOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      ssl: this.configService.get<boolean>('DB_SSL') || false,
      entities: [__dirname + '/../database/entities/*{.ts,.js}'],
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    };
  }
}

// For CLI
const configService = new ConfigService(
  ConfigModule.forRoot({
    load: [configuration],
  }),
);
const typeOrmConfig = new PostgresConfigService(configService);
const dataSource = new DataSource(typeOrmConfig.createTypeOrmOptions());
export default dataSource;
