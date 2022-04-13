import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from '../mail/mail.module';
import { UserSubscriber } from './subscriber/user.subscriber';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), forwardRef(() => MailModule)],
  controllers: [UserController],
  providers: [UserService, UserSubscriber],
  exports: [TypeOrmModule]
})
export class UserModule { }
