import { ICommandBus, uuid } from '@aurorajs.dev/core';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { verifyWebhookSignature } from '../shared';
import { WhatsappPayload } from '@app/whatsapp';
import { WhatsappCreateMessageCommand } from '@app/whatsapp/message';
import { WhatsappMessageDirection } from '@api/graphql';

@Injectable()
export class WhatsappDigestWebhooksHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        xHubSignature256: string,
        payload: WhatsappPayload,
    ): Promise<void>
    {
        if (!verifyWebhookSignature(xHubSignature256, payload)) throw new UnauthorizedException('Invalid signature');

        console.log('WhatsappDigestWebhooksHandler', payload);

        await this.commandBus.dispatch(new WhatsappCreateMessageCommand(
            {
                id                : uuid(),
                whatsappMessageId : uuid(),
                conversationId    : '',
                direction         : WhatsappMessageDirection.INPUT,
                accountId         : null,
                displayPhoneNumber: '',
                phoneNumberId     : '',
                type              : 'text',
                payload,
            },
        ));
    }
}