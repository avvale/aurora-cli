import { MessageMessage, messageMockMessageData } from '@app/message/message';
import {
    MessageMessageAccountRecipientIds,
    MessageMessageAttachments,
    MessageMessageBody,
    MessageMessageCreatedAt,
    MessageMessageDeletedAt,
    MessageMessageIcon,
    MessageMessageId,
    MessageMessageImage,
    MessageMessageIsImportant,
    MessageMessageIsInternalLink,
    MessageMessageLink,
    MessageMessageMeta,
    MessageMessageReads,
    MessageMessageScopeRecipients,
    MessageMessageSendAt,
    MessageMessageStatus,
    MessageMessageSubject,
    MessageMessageTagRecipients,
    MessageMessageTenantIds,
    MessageMessageTenantRecipientIds,
    MessageMessageTotalRecipients,
    MessageMessageUpdatedAt,
} from '@app/message/message/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class MessageMockMessageSeeder extends MockSeeder<MessageMessage>
{
    public collectionSource: MessageMessage[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const message of _.orderBy(messageMockMessageData, ['id']))
        {
            this.collectionSource.push(
                MessageMessage.register(
                    new MessageMessageId(message.id),
                    new MessageMessageTenantIds(message.tenantIds),
                    new MessageMessageStatus(message.status),
                    new MessageMessageAccountRecipientIds(message.accountRecipientIds),
                    new MessageMessageTenantRecipientIds(message.tenantRecipientIds),
                    new MessageMessageScopeRecipients(message.scopeRecipients),
                    new MessageMessageTagRecipients(message.tagRecipients),
                    new MessageMessageSendAt(message.sendAt),
                    new MessageMessageIsImportant(message.isImportant),
                    new MessageMessageSubject(message.subject),
                    new MessageMessageBody(message.body),
                    new MessageMessageLink(message.link),
                    new MessageMessageIsInternalLink(message.isInternalLink),
                    new MessageMessageImage(message.image),
                    new MessageMessageIcon(message.icon),
                    new MessageMessageAttachments(message.attachments),
                    new MessageMessageTotalRecipients(message.totalRecipients),
                    new MessageMessageReads(message.reads),
                    new MessageMessageMeta(message.meta),
                    new MessageMessageCreatedAt({ currentTimestamp: true }),
                    new MessageMessageUpdatedAt({ currentTimestamp: true }),
                    new MessageMessageDeletedAt(null),
                ),
            );
        }
    }
}
