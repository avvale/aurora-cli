/* eslint-disable camelcase */
import type Mail from 'nodemailer/lib/mailer';
import { Transport } from 'nodemailer';
import { Client } from '@microsoft/microsoft-graph-client';
import { HttpService } from '@nestjs/axios';
import { GraphTransportOptions } from './microsoft-graph.types';
import { readFileSync } from 'node:fs';
import { lastValueFrom } from 'rxjs';

export class MicrosoftGraphTransport implements Transport
{
    name = 'microsoft-graph';
    version = '1.0.0';

    constructor(
        private readonly httpService: HttpService,
        private readonly options: GraphTransportOptions,
    )
    {
        this.options = {
            scope: 'https://graph.microsoft.com/.default',
            ...options,
        };
    }

    // Main API required by Nodemailer
    async send(
        mail: Mail.Message,
        callback: (err: Error | null, info?: any) => void,
    ): Promise<void>
    {
        try
        {
            const data = mail.data as Mail.Options;
            const payload = this.toGraphMessage(data);
            const client = await this.graphClient();

            const userSegment = this.options.userId ? `/users/${this.options.userId}` : '/users'; // app-only does not have /me
            // For app-only, you must send as a specific user with appropriate permissions:
            // POST /users/{userId}/sendMail
            const res = await client.api(`${userSegment}/sendMail`).post(payload);

            // Nodemailer expects an "info".
            const info = {
                envelope: {
                    from: payload.message.from?.emailAddress?.address,
                    to  : (payload.message.toRecipients ?? []).map((r: any) => r.emailAddress.address),
                },
                messageId: res?.id ?? undefined, // Graph does not always return id here
                accepted : (payload.message.toRecipients ?? []).map((r: any) => r.emailAddress.address),
                rejected : [],
                response : 'Message accepted by Microsoft Graph',
            };

            callback(null, info);
        }
        catch (err: any)
        {
            callback(err);
        }
    }

    private async getAccessToken(): Promise<string>
    {
        const body = new URLSearchParams({
            client_id    : this.options.clientId,
            client_secret: this.options.clientSecret,
            scope        : this.options.scope,
            grant_type   : 'client_credentials',
        });

        const res$ = this.httpService.post(
            `https://login.microsoftonline.com/${this.options.tenantId}/oauth2/v2.0/token`,
            body.toString(),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }},
        );

        const res = await lastValueFrom(res$);

        return res.data.access_token as string;
    }

    private async graphClient(): Promise<Client>
    {
        const accessToken = await this.getAccessToken();
        return Client.init({
            authProvider: done => done(null, accessToken),
        });
    }

    // Converts Nodemailer data to Graph payload
    private toGraphMessage(data: Mail.Options): { message: any; saveToSentItems: boolean; }
    {
        // addresses
        const toRecipients = this.formatRecipients((data.to ? (Array.isArray(data.to) ? data.to : [data.to]) : []));
        const ccRecipients = this.formatRecipients((data.cc ? (Array.isArray(data.cc) ? data.cc : [data.cc]) : []));
        const bccRecipients = this.formatRecipients((data.bcc ? (Array.isArray(data.bcc) ? data.bcc : [data.bcc]) : []));

        // Body (prefers HTML if exists)
        const hasHtml = !!data.html;
        const bodyContent = hasHtml ? String(data.html) : String(data.text ?? '');

        // Attachments
        // Graph requires base64 in "contentBytes"
        const attachments = (data.attachments ?? []).map(att => ({
            '@odata.type': '#microsoft.graph.fileAttachment',
            name         : att.filename ?? 'attachment',
            contentType  : att.contentType ?? 'application/octet-stream',
            isInline     : !!att.cid,
            contentId    : att.cid ?? undefined,
            contentBytes : Buffer.isBuffer(att.content)
                ? att.content.toString('base64')
                : typeof att.content === 'string'
                    ? Buffer.from(att.content).toString('base64')
                    : // if it comes as a path, read it (simple; better read it outside if you prefer).
                    att.path
                        ? Buffer.from(readFileSync(att.path)).toString('base64')
                        : undefined,
        })) || [];

        const fromAddress =
            (typeof data.from === 'string'
                ? data.from
                : data.from && 'address' in data.from
                    ? data.from.address
                    : undefined) ?? this.options.from;

        const message = {
            subject: data.subject ?? '',
            from   : { emailAddress: { address: fromAddress }},
            toRecipients,
            ccRecipients,
            bccRecipients,
            body   : {
                contentType: hasHtml ? 'HTML' : 'Text',
                content    : bodyContent,
            },
            attachments,
            // Note: inline images with CID require the HTML to reference cid:<contentId>.
        };

        return { message, saveToSentItems: true };
    }

    private formatRecipients(recipients: string[]): { emailAddress: { address: any; }; }[]
    {
        return recipients
            .flatMap((r: any) => (typeof r === 'string' ? r.split(',') : [r]))
            .map((addr: any) => (typeof addr === 'string' ? addr.trim() : addr))
            .filter(Boolean)
            .map((addr: any) => ({
                emailAddress: { address: typeof addr === 'string' ? addr : addr.address },
            }));
    }
}