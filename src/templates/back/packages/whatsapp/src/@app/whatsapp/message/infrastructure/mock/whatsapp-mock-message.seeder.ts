import { WhatsappMessage, whatsappMockMessageData } from '@app/whatsapp/message';
import {
    WhatsappMessageAccountId,
    WhatsappMessageConversationId,
    WhatsappMessageCreatedAt,
    WhatsappMessageDeletedAt,
    WhatsappMessageDirection,
    WhatsappMessageDisplayPhoneNumber,
    WhatsappMessageId,
    WhatsappMessagePayload,
    WhatsappMessagePhoneNumberId,
    WhatsappMessageType,
    WhatsappMessageUpdatedAt,
    WhatsappMessageWhatsappMessageId,
} from '@app/whatsapp/message/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class WhatsappMockMessageSeeder extends MockSeeder<WhatsappMessage>
{
    public collectionSource: WhatsappMessage[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const message of _.orderBy(whatsappMockMessageData, ['id']))
        {
            this.collectionSource.push(
                WhatsappMessage.register(
                    new WhatsappMessageId(message.id),
                    new WhatsappMessageWhatsappMessageId(message.whatsappMessageId),
                    new WhatsappMessageConversationId(message.conversationId),
                    new WhatsappMessageDirection(message.direction),
                    new WhatsappMessageAccountId(message.accountId),
                    new WhatsappMessageDisplayPhoneNumber(message.displayPhoneNumber),
                    new WhatsappMessagePhoneNumberId(message.phoneNumberId),
                    new WhatsappMessageType(message.type),
                    new WhatsappMessagePayload(message.payload),
                    new WhatsappMessageCreatedAt({ currentTimestamp: true }),
                    new WhatsappMessageUpdatedAt({ currentTimestamp: true }),
                    new WhatsappMessageDeletedAt(null),
                ),
            );
        }
    }
}
