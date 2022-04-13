import { Module } from '@nestjs/common';
import { UserHttpModule } from '../user/user-http.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GithubStrategy } from './strategy/github.strategy';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [UserHttpModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, GithubStrategy]
})
export class AuthModule { }
