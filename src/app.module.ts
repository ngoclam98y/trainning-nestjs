import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import appConfig from 'config/app.config';
import databaseConfig from 'config/database.config';
import { DatabaseModule } from 'database/database.module';
import { AllExceptionFilter } from 'filter/exception.filter';
import { LoggerService } from 'logger/custom.logger';
import { LoggerModule } from 'logger/logger.module';
import authConfig from '../config/auth.config';
import mailConfig from '../config/mail.config';
import { ValidatorModule } from '../validators/validator.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        databaseConfig,
        authConfig,
        mailConfig
      ],
    }),
    LoggerModule,
    // UserHttpModule,
    ValidatorModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    AppService,
    LoggerService,
  ],
})
export class AppModule { }
