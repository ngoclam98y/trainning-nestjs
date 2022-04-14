import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { UserSubscriber } from './subscriber/user.subscriber';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), forwardRef(() => MailModule), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, UserSubscriber],
  exports: [TypeOrmModule]
})
export class UserModule { }
