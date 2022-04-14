import { MailerService } from '@nestjs-modules/mailer';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { randomBytes } from 'crypto';
import { UserService } from '../user/user.service';
import { ResetMailDto } from './dto/resetMail.dto';

@ApiTags('mail')
@Injectable()
export class MailService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private mailerService: MailerService
  ) { }


  async sendMailService({ to, subject, template, context }) {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        template,
        context
      })
    } catch (error) {
      throw new HttpException(`request reset password is error ${JSON.stringify(error)}`, HttpStatus.BAD_GATEWAY);
    }
  }


  async sendResetPassword(request: any, resetMailDto: ResetMailDto) {
    try {
      const user = await this.userService.findByEmail(resetMailDto);
      if (!user) {
        throw new HttpException('Email is incorrect', HttpStatus.BAD_REQUEST);
      }
      const update = {
        resetPasswordToken: randomBytes(20).toString('hex'),
        resetPasswordExpires: new Date(Date.now() + 60 * 60 * 60)
      }

      const userUpdate = await this.userService.update(user.id, update);

      let link = "http://" + request.headers.host + "/user/reset-password/" + userUpdate.resetPasswordToken;

      await this.sendMailService({
        to: user.email,
        subject: 'Welcome to Reset password! Confirm your Email',
        template: 'confirmation',
        context: {
          name: user.userName,
          url: link,
        },
      })

      return {
        success: true,
        message: 'A reset email has been sent to ' + resetMailDto.email
      }
    } catch (error) {
      throw new HttpException(`request reset password is error ${JSON.stringify(error)}`, HttpStatus.BAD_GATEWAY);
    }
  }
}
