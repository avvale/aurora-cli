import { MailerSMTPTransportService } from '@aurora/modules/mailer/mailer-smtp-transport.service';
import { MailerTransportService } from '@aurorajs.dev/core';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: MailerTransportService,
      useClass: MailerSMTPTransportService,
    },
  ],
  exports: [MailerTransportService],
})
export class MailerTransportModule {}
