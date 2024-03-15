import { WhatsappConversation, WhatsappIConversationRepository, whatsappMockConversationData } from '@app/whatsapp/conversation';
import {
    WhatsappConversationAccounts,
    WhatsappConversationCreatedAt,
    WhatsappConversationDeletedAt,
    WhatsappConversationId,
    WhatsappConversationUpdatedAt,
} from '@app/whatsapp/conversation/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappMockConversationRepository extends MockRepository<WhatsappConversation> implements WhatsappIConversationRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'WhatsappConversation';
    public collectionSource: WhatsappConversation[];

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

        for (const itemCollection of <any[]>whatsappMockConversationData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(WhatsappConversation.register(
                new WhatsappConversationId(itemCollection.id),
                new WhatsappConversationAccounts(itemCollection.accounts),
                new WhatsappConversationCreatedAt(itemCollection.createdAt),
                new WhatsappConversationUpdatedAt(itemCollection.updatedAt),
                new WhatsappConversationDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
