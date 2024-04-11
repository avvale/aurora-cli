import { MessageIOutboxRepository, messageMockOutboxData, MessageOutbox } from '@app/message/outbox';
import {
    MessageOutboxAccountRecipientIds,
    MessageOutboxCreatedAt,
    MessageOutboxDeletedAt,
    MessageOutboxId,
    MessageOutboxMessageId,
    MessageOutboxMeta,
    MessageOutboxScopeRecipients,
    MessageOutboxSort,
    MessageOutboxTagRecipients,
    MessageOutboxTenantRecipientIds,
    MessageOutboxUpdatedAt,
} from '@app/message/outbox/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageMockOutboxRepository extends MockRepository<MessageOutbox> implements MessageIOutboxRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'MessageOutbox';
    public collectionSource: MessageOutbox[];

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

        for (const itemCollection of <any[]>messageMockOutboxData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(MessageOutbox.register(
                new MessageOutboxId(itemCollection.id),
                new MessageOutboxMessageId(itemCollection.messageId),
                new MessageOutboxSort(itemCollection.sort),
                new MessageOutboxAccountRecipientIds(itemCollection.accountRecipientIds),
                new MessageOutboxTenantRecipientIds(itemCollection.tenantRecipientIds),
                new MessageOutboxScopeRecipients(itemCollection.scopeRecipients),
                new MessageOutboxTagRecipients(itemCollection.tagRecipients),
                new MessageOutboxMeta(itemCollection.meta),
                new MessageOutboxCreatedAt(itemCollection.createdAt),
                new MessageOutboxUpdatedAt(itemCollection.updatedAt),
                new MessageOutboxDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
