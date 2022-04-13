import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('databaseHost'),
        port: configService.get<number>('databasePort'),
        username: configService.get<string>('databaseUsername'),
        password: configService.get<string>('databasePassword'),
        database: configService.get<string>('databaseName'),
        entities: [User],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule { }
