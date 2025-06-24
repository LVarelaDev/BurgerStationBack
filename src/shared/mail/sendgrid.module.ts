import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';
import { MailService } from './sendgrid.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'SENDGRID_MAIL',
      useFactory: (config: ConfigService) => {
        sgMail.setApiKey(config.get<string>('SENDGRID_API_KEY') ?? '');
        return sgMail;
      },
      inject: [ConfigService],
    },
    {
      provide: 'MailService',
      useClass: MailService,
    },
  ],
  exports: ['MailService'],
})
export class SendGridModule {}
