/* eslint-disable quote-props */
/* eslint-disable camelcase */
/* eslint-disable max-len */
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { Button } from '@app/whatsapp/whatsapp.types';

@Injectable()
export class WhatsappConnectorService
{
    baseApi = 'https://graph.facebook.com';
    version = 'v19.0';
    messagesApi = 'messages';

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
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

    sendText(
        to: string,
        text: string,
        previewUrl: boolean = false,
    ): Observable<any>
    {
        return this.httpService
            .post(
                this.getUrlMessagesPath(),
                {
                    messaging_product: 'whatsapp',
                    recipient_type   : 'individual',
                    to,
                    type             : 'text',
                    text             : {
                        preview_url: previewUrl,
                        body       : text,
                    },
                },
                {
                    headers: this.getCommonHeaders(to),
                },
            );
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

    sendButton(
        to: string,
        textHeader: string,
        textBody: string,
        buttons: Button[],
    ): Observable<any>
    {
        const whatsappButtons = [];
        for (const button of  buttons)
        {
            whatsappButtons.push({
                type : 'reply',
                reply: {
                    'id'   : button.id,
                    'title': button.title,
                },
            });
        }

        return this.httpService
            .post(
                this.getUrlMessagesPath(),
                {
                    messaging_product: 'whatsapp',
                    recipient_type   : 'individual',
                    to,
                    type             : 'interactive',
                    interactive      : {
                        type: 'button',
                        body: {
                            text: textBody,
                        },
                        action: {
                            buttons: whatsappButtons,
                        },
                    },
                },
                {
                    headers: this.getCommonHeaders(to),
                },
            );
    }

    sendTemplate(
        to: string,
        templateName: string,
        language: string,
        headerParameters: any[] = [],
        bodyParameters: any[] = [],
        buttons: any[] = [],
    ): Observable<any>
    {
        return this.httpService
            .post(
                this.getUrlMessagesPath(),
                {
                    messaging_product: 'whatsapp',
                    recipient_type   : 'individual',
                    to,
                    type             : 'template',
                    template         : {
                        name    : templateName,
                        language: {
                            code: language,
                        },
                        components: [
                            {
                                type      : 'header',
                                parameters: headerParameters,
                            },
                            {
                                type      : 'body',
                                parameters: bodyParameters,
                            },
                            ...buttons,
                        ],
                    },
                },
                {
                    headers: this.getCommonHeaders(to),
                },
            );
    }

    setRead(
        to: string,
        messageId: string,
    ): Observable<any>
    {
        return this.httpService
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
            );
    }
}