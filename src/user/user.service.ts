import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base.service';
import { LoggerService } from '../../logger/custom.logger';
import { ResetMailDto } from '../mail/dto/resetMail.dto';
import { MailService } from '../mail/mail.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
    constructor(
        @Inject(forwardRef(() => MailService))
        private readonly mailService: MailService,
        repository: UserRepository,
        logger: LoggerService
    ) {
        super(repository, logger);
    }

    findByEmail(resetMailDto: ResetMailDto): Promise<User | null> {
        return this.repository.findOne({ email: resetMailDto.email })
    }

    getResetPassword(token: string): Promise<User> {
        return this.repository.getResetPassword(token);
    }

    async updatePassword(token: string, resetPasswordDto: ResetPasswordDto): Promise<boolean> {
        try {
            const result = await this.repository.updatePassword(token, resetPasswordDto);
            if (result) {
                this.mailService.sendMailService({
                    to: 'ngoclam.sn98@gmail.com',
                    subject: 'reset password is success !',
                    context: {},
                    template: "reset-password-success"
                })
            }
            return result;
        } catch (error) {
            throw new HttpException(`update reset password is error ${JSON.stringify(error)}`, HttpStatus.BAD_GATEWAY);
        }

    }
}
