import { forwardRef, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { LoggerService } from '../../logger/custom.logger'
import { AuthModule } from '../auth/auth.module'
import { MailModule } from '../mail/mail.module'
import { UserController } from './user.controller'
import { UserModule } from './user.module'
import { UserService } from './user.service'

@Module({
    imports: [UserModule, ConfigService, LoggerService, forwardRef(() => MailModule), forwardRef(() => AuthModule)],
    providers: [UserService],
    exports: [UserService],
    controllers: [UserController],
})
export class UserHttpModule {
}