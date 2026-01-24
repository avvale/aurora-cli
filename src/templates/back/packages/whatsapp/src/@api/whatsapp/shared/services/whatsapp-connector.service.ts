/* eslint-disable quote-props */
/* eslint-disable camelcase */
/* eslint-disable max-len */
import {
  WhatsappMessage,
  WhatsappMessageDirection,
  WhatsappMessageStatus,
  WhatsappMessageType,
} from '@api/graphql';
import { WhatsappCreateMessageCommand } from '@app/whatsapp/message';
import {
  WhatsappContact,
  WhatsappInteractiveBody,
  WhatsappInteractiveFooter,
  WhatsappInteractiveHeader,
  WhatsappInteractiveType,
} from '@app/whatsapp/whatsapp.types';
import { ICommandBus, uuid } from '@aurorajs.dev/core';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import parsePhoneNumberFromString, { CountryCode } from 'libphonenumber-js';
import { Observable, lastValueFrom } from 'rxjs';
import { makeSendInteractivePayload } from '../functions/make-send-interactive-payload.function';
import { makeSendTemplatePayload } from '../functions/make-send-template-payload.function';
import { makeSendTextPayload } from '../functions/make-send-text-payload.function';
import { WhatsappTemplateParameters } from '../whatsapp.types';
import { WhatsappTimelineService } from './whatsapp-timeline.service';

@Injectable()
export class WhatsappConnectorService {
  baseApi = 'https://graph.facebook.com';
  version = 'v22.0';
  messagesApi = 'messages';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly commandBus: ICommandBus,
    private readonly whatsappTimelineService: WhatsappTimelineService,
  ) {}

  getSenderTelephoneNumberId(): string {
    return this.configService.get('WHATSAPP_SENDER_TELEPHONE_NUMBER_ID');
  }

  getAccessToken(): string {
    return this.configService.get('WHATSAPP_ACCESS_TOKEN');
  }

  getUrlMessagesPath(): string {
    return `${this.baseApi}/${this.version}/${this.getSenderTelephoneNumberId()}/${this.messagesApi}`;
  }

  getCommonHeaders(to: string, customHeaders?: object): object {
    return {
      Authorization: `Bearer ${this.getAccessToken()}`,
      'Content-Type': 'application/json',
      'X-Auditing-Tags': `WABA ${to}`,
      ...customHeaders,
    };
  }

  async sendText(
    {
      to,
      text,
      previewUrl = false,
    }: {
      to: string;
      text: string;
      previewUrl?: boolean;
    },
    customHeaders?: object,
  ): Promise<any> {
    const payload = makeSendTextPayload({
      to,
      text,
      previewUrl,
    });

    const response = await lastValueFrom(
      this.httpService.post(this.getUrlMessagesPath(), payload, {
        headers: this.getCommonHeaders(to, customHeaders),
      }),
    );

    await this.createMessage(
      WhatsappMessageType.TEXT,
      response.data?.messages,
      response.data?.contacts[0],
      payload,
    );

    return response.data;
  }

  sendImage(
    {
      to,
      link,
    }: {
      to: string;
      link: string;
    },
    customHeaders?: object,
  ): Observable<any> {
    return this.httpService.post(
      this.getUrlMessagesPath(),
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'image',
        image: {
          link, // png or jpg
        },
      },
      {
        headers: this.getCommonHeaders(to, customHeaders),
      },
    );
  }

  sendAudio(
    {
      to,
      link,
    }: {
      to: string;
      link: string;
    },
    customHeaders?: object,
  ): Observable<any> {
    return this.httpService.post(
      this.getUrlMessagesPath(),
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'audio',
        audio: {
          link, // mp3 or wav
        },
      },
      {
        headers: this.getCommonHeaders(to, customHeaders),
      },
    );
  }

  sendDocument(
    {
      to,
      link,
      caption,
    }: {
      to: string;
      link: string;
      caption: string;
    },
    customHeaders?: object,
  ): Observable<any> {
    return this.httpService.post(
      this.getUrlMessagesPath(),
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'document',
        document: {
          link, // doc, xls, ppt
          caption,
        },
      },
      {
        headers: this.getCommonHeaders(to, customHeaders),
      },
    );
  }

  sendVideo(
    {
      to,
      link,
      caption,
    }: {
      to: string;
      link: string;
      caption: string;
    },
    customHeaders?: object,
  ): Observable<any> {
    return this.httpService.post(
      this.getUrlMessagesPath(),
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'video',
        video: {
          link, // mp4
          caption,
        },
      },
      {
        headers: this.getCommonHeaders(to, customHeaders),
      },
    );
  }

  sendSticker(
    {
      to,
      link,
    }: {
      to: string;
      link: string;
    },
    customHeaders?: object,
  ): Observable<any> {
    return this.httpService.post(
      this.getUrlMessagesPath(),
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'sticker',
        sticker: {
          link, // webp
        },
      },
      {
        headers: this.getCommonHeaders(to, customHeaders),
      },
    );
  }

  sendLocation(
    {
      to,
      latitude,
      longitude,
      name,
      address,
    }: {
      to: string;
      latitude: string;
      longitude: string;
      name: string;
      address: string;
    },
    customHeaders?: object,
  ): Observable<any> {
    return this.httpService.post(
      this.getUrlMessagesPath(),
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'location',
        location: {
          latitude,
          longitude,
          name,
          address,
        },
      },
      {
        headers: this.getCommonHeaders(to, customHeaders),
      },
    );
  }

  async sendInteractive(
    {
      to,
      type,
      header,
      body,
      footer,
      action,
    }: {
      to: string;
      type: WhatsappInteractiveType;
      header?: WhatsappInteractiveHeader;
      body?: WhatsappInteractiveBody;
      footer?: WhatsappInteractiveFooter;
      action: any;
    },
    customHeaders?: object,
  ): Promise<any> {
    const payload = makeSendInteractivePayload({
      to,
      type,
      header,
      body,
      footer,
      action,
    });

    try {
      const response = await lastValueFrom(
        this.httpService.post(this.getUrlMessagesPath(), payload, {
          headers: this.getCommonHeaders(to, customHeaders),
        }),
      );

      await this.createMessage(
        WhatsappMessageType.INTERACTIVE,
        response.data?.messages,
        response.data?.contacts[0],
        payload,
      );

      return response.data;
    } catch (error) {
      Logger.error(`Error sending interactive message: ${error}`);
    }
  }

  async sendTemplate(
    {
      to,
      country,
      templateName,
      language,
      headerParameters,
      bodyParameters,
      buttons,
    }: WhatsappTemplateParameters,
    customHeaders?: object,
  ): Promise<any> {
    // guard clause
    this.parsePhoneNumber(to, country);

    const payload = makeSendTemplatePayload({
      to,
      templateName,
      language,
      headerParameters,
      bodyParameters,
      buttons,
    });

    const response = await lastValueFrom(
      this.httpService.post(this.getUrlMessagesPath(), payload, {
        headers: this.getCommonHeaders(to, customHeaders),
      }),
    );

    await this.createMessage(
      WhatsappMessageType.TEMPLATE,
      response.data?.messages,
      response.data?.contacts[0],
      payload,
    );

    return response.data;
  }

  async setReadStatus(
    {
      to,
      messageId,
    }: {
      to: string;
      messageId: string;
    },
    customHeaders?: object,
  ): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.post(
        this.getUrlMessagesPath(),
        {
          messaging_product: 'whatsapp',
          status: 'read',
          message_id: messageId,
        },
        {
          headers: this.getCommonHeaders(to, customHeaders),
        },
      ),
    );

    return response.data;
  }

  callApi(
    {
      to,
      ...payload
    }: {
      to: string;
      [key: string]: any;
    },
    customHeaders?: object,
  ): Observable<any> {
    return this.httpService.post(this.getUrlMessagesPath(), payload, {
      headers: this.getCommonHeaders(to, customHeaders),
    });
  }

  private async createMessage(
    messageType: WhatsappMessageType,
    messages: WhatsappMessage[],
    contact: WhatsappContact,
    payload: any,
  ): Promise<void> {
    // guard clause
    if (!Array.isArray(messages))
      Logger.error(`Invalid message structure: Messages is not array.
messages: ${JSON.stringify(messages)}
contact: ${JSON.stringify(contact)}
payload: ${JSON.stringify(payload)}
`);

    if (!contact)
      Logger.error(`Invalid message structure: Contact is not defined.
messages: ${JSON.stringify(messages)}
contact: ${JSON.stringify(contact)}
payload: ${JSON.stringify(payload)}
`);

    if (!payload)
      Logger.error(`Invalid message structure: Payload is not defined.
messages: ${JSON.stringify(messages)}
contact: ${JSON.stringify(contact)}
payload: ${JSON.stringify(payload)}
`);

    // get timeline for current contact and sender telephone id
    const timeline = await this.whatsappTimelineService.getTimeline(
      this.getSenderTelephoneNumberId(),
      contact.wa_id,
    );

    const commandCreateMessagePromises = [];
    for (const message of messages) {
      commandCreateMessagePromises.push(
        this.commandBus.dispatch(
          new WhatsappCreateMessageCommand({
            id: uuid(),
            wabaMessageId: message.id,
            timelineId: timeline.id,
            conversationId: null,
            statuses: [WhatsappMessageStatus.ACCEPTED],
            direction: WhatsappMessageDirection.OUTPUT,
            accountId: null,
            wabaContactId: contact.wa_id,
            contactName: null,
            type: messageType,
            payload,
          }),
        ),
      );
    }

    await Promise.all(commandCreateMessagePromises);
  }

  private parsePhoneNumber(to: string, country: CountryCode): void {
    if (!parsePhoneNumberFromString(to, country)?.isValid()) {
      throw new BadRequestException(
        `The Phone number "${to}" is not correct to send a whatsapp for the country "${country}".`,
      );
    }
  }
}
