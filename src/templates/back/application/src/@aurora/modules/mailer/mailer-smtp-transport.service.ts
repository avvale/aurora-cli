import { MailerTransportService } from '@aurorajs.dev/core';
import { TransportType } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerSMTPTransportService extends MailerTransportService {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  getTransport(): TransportType {
    return {
      host: this.configService.get<string>('MAILER_HOST'),
      port: +this.configService.get<number>('MAILER_PORT'),
      ignoreTLS:
        this.configService.get<string>('MAILER_IGNORE_TLS') === 'true'
          ? true
          : false,
      secure:
        this.configService.get<string>('MAILER_SECURE') === 'true'
          ? true
          : false,
      auth: {
        user: this.configService.get<string>('MAILER_USER'),
        pass: this.configService.get<string>('MAILER_PASSWORD'),
      },
    };
  }
}
