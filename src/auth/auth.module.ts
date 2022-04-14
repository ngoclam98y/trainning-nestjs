import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserHttpModule } from '../user/user-http.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GithubStrategy } from './strategy/github.strategy';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [
    forwardRef(() => UserHttpModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
      }),
      inject: [ConfigService],
    })],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, GithubStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthModule { }
