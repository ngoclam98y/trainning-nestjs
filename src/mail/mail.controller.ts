import { Body, Controller, Post, Request } from '@nestjs/common';
import { ResetMailDto } from './dto/resetMail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) { }

  @Post("/request-resetpassword")
  create(@Body() resetMailDto: ResetMailDto, @Request() request) {
    return this.mailService.sendResetPassword(request, resetMailDto);
  }
}
