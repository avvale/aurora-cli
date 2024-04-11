import { MessageIInboxRepository, MessageInbox, messageMockInboxData } from '@app/message/inbox';
import {
    MessageInboxAccountCode,
    MessageInboxAccountId,
    MessageInboxAttachments,
    MessageInboxBody,
    MessageInboxCreatedAt,
    MessageInboxDeletedAt,
    MessageInboxIcon,
    MessageInboxId,
    MessageInboxImage,
    MessageInboxIsImportant,
    MessageInboxIsInternalLink,
    MessageInboxIsRead,
    MessageInboxIsReadAtLeastOnce,
    MessageInboxLink,
    MessageInboxMessageId,
    MessageInboxMeta,
    MessageInboxSentAt,
    MessageInboxSort,
    MessageInboxSubject,
    MessageInboxTenantIds,
    MessageInboxUpdatedAt,
} from '@app/message/inbox/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageMockInboxRepository extends MockRepository<MessageInbox> implements MessageIInboxRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'MessageInbox';
    public collectionSource: MessageInbox[];

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

        for (const itemCollection of <any[]>messageMockInboxData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(MessageInbox.register(
                new MessageInboxId(itemCollection.id),
                new MessageInboxTenantIds(itemCollection.tenantIds),
                new MessageInboxMessageId(itemCollection.messageId),
                new MessageInboxSort(itemCollection.sort),
                new MessageInboxAccountId(itemCollection.accountId),
                new MessageInboxAccountCode(itemCollection.accountCode),
                new MessageInboxIsImportant(itemCollection.isImportant),
                new MessageInboxSentAt(itemCollection.sentAt),
                new MessageInboxSubject(itemCollection.subject),
                new MessageInboxBody(itemCollection.body),
                new MessageInboxLink(itemCollection.link),
                new MessageInboxIsInternalLink(itemCollection.isInternalLink),
                new MessageInboxImage(itemCollection.image),
                new MessageInboxIcon(itemCollection.icon),
                new MessageInboxAttachments(itemCollection.attachments),
                new MessageInboxIsRead(itemCollection.isRead),
                new MessageInboxIsReadAtLeastOnce(itemCollection.isReadAtLeastOnce),
                new MessageInboxMeta(itemCollection.meta),
                new MessageInboxCreatedAt(itemCollection.createdAt),
                new MessageInboxUpdatedAt(itemCollection.updatedAt),
                new MessageInboxDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
