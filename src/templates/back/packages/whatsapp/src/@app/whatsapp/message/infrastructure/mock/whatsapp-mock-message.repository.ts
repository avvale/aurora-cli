import { WhatsappIMessageRepository, WhatsappMessage, whatsappMockMessageData } from '@app/whatsapp/message';
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
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappMockMessageRepository extends MockRepository<WhatsappMessage> implements WhatsappIMessageRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'WhatsappMessage';
    public collectionSource: WhatsappMessage[];

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset(): void
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>whatsappMockMessageData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(WhatsappMessage.register(
                new WhatsappMessageId(itemCollection.id),
                new WhatsappMessageWhatsappMessageId(itemCollection.whatsappMessageId),
                new WhatsappMessageConversationId(itemCollection.conversationId),
                new WhatsappMessageDirection(itemCollection.direction),
                new WhatsappMessageAccountId(itemCollection.accountId),
                new WhatsappMessageDisplayPhoneNumber(itemCollection.displayPhoneNumber),
                new WhatsappMessagePhoneNumberId(itemCollection.phoneNumberId),
                new WhatsappMessageType(itemCollection.type),
                new WhatsappMessagePayload(itemCollection.payload),
                new WhatsappMessageCreatedAt(itemCollection.createdAt),
                new WhatsappMessageUpdatedAt(itemCollection.updatedAt),
                new WhatsappMessageDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
