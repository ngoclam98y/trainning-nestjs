import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { UserHttpModule } from '../user/user-http.module';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  imports: [
    forwardRef(() => UserHttpModule),
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('mailHost'),
          port: config.get("mailPort"),
          secure: false,
          auth: {
            user: config.get('mailUser'),
            pass: config.get('mailPassword'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('mailFrom')}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule { }
