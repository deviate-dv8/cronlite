import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { HealthController } from './health/health.controller';
import { AuthModule } from './authentication/auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppConfigModule } from './config/appConfig.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, AuthModule, UsersModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
