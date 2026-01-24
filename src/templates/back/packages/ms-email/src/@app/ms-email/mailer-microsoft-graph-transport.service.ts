import { MailerTransportService } from '@aurorajs.dev/core';
import { TransportType } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicrosoftGraphTransport } from './microsoft-graph.transport';

@Injectable()
export class MailerMicrosoftGraphTransportService extends MailerTransportService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    super();
  }

  getTransport(): TransportType {
    return new MicrosoftGraphTransport(this.httpService, {
      tenantId: this.configService.get<string>('MS_GRAPH_TENANT_ID'),
      clientId: this.configService.get<string>('MS_GRAPH_CLIENT_ID'),
      clientSecret: this.configService.get<string>('MS_GRAPH_CLIENT_SECRET'),
      from: this.configService.get<string>('MS_GRAPH_MAIL_FROM'),
      userId: this.configService.get<string>('MS_GRAPH_USER_ID'),
    });
  }
}
