/* eslint-disable quote-props */
/* eslint-disable camelcase */
/* eslint-disable max-len */
import { WhatsappMessageDirection, WhatsappMessage, WhatsappMessageStatus, WhatsappMessageType } from '@api/graphql';
import { WhatsappCreateMessageCommand } from '@app/whatsapp/message';
import { WhatsappContact, WhatsappInteractiveBody, WhatsappInteractiveFooter, WhatsappInteractiveHeader, WhatsappInteractiveType } from '@app/whatsapp/whatsapp.types';
import { ICommandBus, uuid } from '@aurorajs.dev/core';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, lastValueFrom } from 'rxjs';
import { makeSendTemplatePayload } from '../functions/make-send-template-payload.function';
import { makeSendTextPayload } from '../functions/make-send-text-payload.function';
import { WhatsappTimelineService } from './whatsapp-timeline.service';
import { makeSendInteractivePayload } from '../functions/make-send-interactive-payload.function';

@Injectable()
export class WhatsappConnectorService
{
    baseApi = 'https://graph.facebook.com';
    version = 'v19.0';
    messagesApi = 'messages';

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        private readonly commandBus: ICommandBus,
        private readonly whatsappTimelineService: WhatsappTimelineService,
    ) {}

    getSenderTelephoneNumberId(): string
    {
        return this.configService.get('WHATSAPP_SENDER_TELEPHONE_NUMBER_ID');
    }

    getAccessToken(): string
    {
        return this.configService.get('WHATSAPP_ACCESS_TOKEN');
    }

    getUrlMessagesPath(): string
    {
        return `${this.baseApi}/${this.version}/${this.getSenderTelephoneNumberId()}/${this.messagesApi}`;
    }

    getCommonHeaders(to: string): object
    {
        return {
            'Authorization'  : `Bearer ${this.getAccessToken()}`,
            'Content-Type'   : 'application/json',
            'X-Auditing-Tags': `WABA ${to}`,
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
    ): Promise<any>
    {
        const payload = makeSendTextPayload({
            to,
            text,
            previewUrl,
        });

        const response = await lastValueFrom(
            this.httpService
                .post(
                    this.getUrlMessagesPath(),
                    payload,
                    {
                        headers: this.getCommonHeaders(to),
                    },
                ),
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
        to: string,
        link: string,
    ): Observable<any>
    {
        return this.httpService
            .post(
                this.getUrlMessagesPath(),
                {
                    messaging_product: 'whatsapp',
                    recipient_type   : 'individual',
                    to,
                    type             : 'image',
                    image            : {
                        link, // png or jpg
                    },
                },
                {
                    headers: this.getCommonHeaders(to),
                },
            );
    }

    sendAudio(
        to: string,
        link: string,
    ): Observable<any>
    {
        return this.httpService
            .post(
                this.getUrlMessagesPath(),
                {
                    messaging_product: 'whatsapp',
                    recipient_type   : 'individual',
                    to,
                    type             : 'audio',
                    audio            : {
                        link, // mp3 or wav
                    },
                },
                {
                    headers: this.getCommonHeaders(to),
                },
            );
    }

    sendDocument(
        to: string,
        link: string,
        caption: string,
    ): Observable<any>
    {
        return this.httpService
            .post(
                this.getUrlMessagesPath(),
                {
                    messaging_product: 'whatsapp',
                    recipient_type   : 'individual',
                    to,
                    type             : 'document',
                    document         : {
                        link, // doc, xls, ppt
                        caption,
                    },
                },
                {
                    headers: this.getCommonHeaders(to),
                },
            );
    }

    sendVideo(
        to: string,
        link: string,
        caption: string,
    ): Observable<any>
    {
        return this.httpService
            .post(
                this.getUrlMessagesPath(),
                {
                    messaging_product: 'whatsapp',
                    recipient_type   : 'individual',
                    to,
                    type             : 'video',
                    video            : {
                        link, // mp4
                        caption,
                    },
                },
                {
                    headers: this.getCommonHeaders(to),
                },
            );
    }

    sendSticker(
        to: string,
        link: string,
    ): Observable<any>
    {
        return this.httpService
            .post(
                this.getUrlMessagesPath(),
                {
                    messaging_product: 'whatsapp',
                    recipient_type   : 'individual',
                    to,
                    type             : 'sticker',
                    sticker          : {
                        link, // webp
                    },
                },
                {
                    headers: this.getCommonHeaders(to),
                },
            );
    }

    sendLocation(
        to: string,
        latitude: string,
        longitude: string,
        name: string,
        address: string,
    ): Observable<any>
    {
        return this.httpService
            .post(
                this.getUrlMessagesPath(),
                {
                    messaging_product: 'whatsapp',
                    recipient_type   : 'individual',
                    to,
                    type             : 'location',
                    location         : {
                        latitude,
                        longitude,
                        name,
                        address,
                    },
                },
                {
                    headers: this.getCommonHeaders(to),
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
    ): Promise<any>
    {
        const payload = makeSendInteractivePayload({
            to,
            type,
            header,
            body,
            footer,
            action,
        });

        try
        {
            const response = await lastValueFrom(
                this.httpService
                    .post(
                        this.getUrlMessagesPath(),
                        payload,
                        {
                            headers: this.getCommonHeaders(to),
                        },
                    ),
            );

            await this.createMessage(
                WhatsappMessageType.INTERACTIVE,
                response.data?.messages,
                response.data?.contacts[0],
                payload,
            );

            return response.data;
        }
        catch (error)
        {
            Logger.error(`Error sending interactive message: ${error}`);
        }
    }

    async sendTemplate(
        {
            to,
            templateName,
            language,
            headerParameters,
            bodyParameters,
            buttons,
        }: {
            to: string;
            templateName: string;
            language: string;
            headerParameters: any[];
            bodyParameters: any[];
            buttons: any[];
        },
    ): Promise<any>
    {
        const payload = makeSendTemplatePayload({
            to,
            templateName,
            language,
            headerParameters,
            bodyParameters,
            buttons,
        });

        const response = await lastValueFrom(
            this.httpService
                .post(
                    this.getUrlMessagesPath(),
                    payload,
                    {
                        headers: this.getCommonHeaders(to),
                    },
                ),
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
    ): Promise<any>
    {
        const response = await lastValueFrom(
            this.httpService
                .post(
                    this.getUrlMessagesPath(),
                    {
                        messaging_product: 'whatsapp',
                        status           : 'read',
                        message_id       : messageId,
                    },
                    {
                        headers: this.getCommonHeaders(to),
                    },
                ),
        );

        return response.data;
    }

    callApi(
        payload: {
            to: string;
            [key: string]: any;
        },
    ): Observable<any>
    {
        return this.httpService
            .post(
                this.getUrlMessagesPath(),
                payload,
                {
                    headers: this.getCommonHeaders(payload.to),
                },
            );
    }

    private async createMessage(
        messageType: WhatsappMessageType,
        messages: WhatsappMessage[],
        contact: WhatsappContact,
        payload: any,
    ): Promise<void>
    {
        // guard clause
        if (!Array.isArray(messages)) Logger.error(`Invalid message structure: Messages is not array.
messages: ${JSON.stringify(messages)}
contact: ${JSON.stringify(contact)}
payload: ${JSON.stringify(payload)}
`);

        if (!contact) Logger.error(`Invalid message structure: Contact is not defined.
messages: ${JSON.stringify(messages)}
contact: ${JSON.stringify(contact)}
payload: ${JSON.stringify(payload)}
`);

        if (!payload) Logger.error(`Invalid message structure: Payload is not defined.
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
        for (const message of messages)
        {
            commandCreateMessagePromises.push(
                this.commandBus.dispatch(new WhatsappCreateMessageCommand(
                    {
                        id            : uuid(),
                        wabaMessageId : message.id,
                        timelineId    : timeline.id,
                        conversationId: null,
                        statuses      : [WhatsappMessageStatus.ACCEPTED],
                        direction     : WhatsappMessageDirection.OUTPUT,
                        accountId     : null,
                        wabaContactId : contact.wa_id,
                        contactName   : null,
                        type          : messageType,
                        payload,
                    },
                )),
            );
        }

        await Promise.all(commandCreateMessagePromises);
    }
}