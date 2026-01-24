import { MessageInbox, messageMockInboxData } from '@app/message/inbox';
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
  MessageInboxMessageRowId,
  MessageInboxMeta,
  MessageInboxRowId,
  MessageInboxSentAt,
  MessageInboxSubject,
  MessageInboxTenantIds,
  MessageInboxUpdatedAt,
} from '@app/message/inbox/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class MessageMockInboxSeeder extends MockSeeder<MessageInbox> {
  public collectionSource: MessageInbox[];

  constructor() {
    super();
    this._createMock();
  }

  private _createMock(): void {
    this.collectionSource = [];

    for (const inbox of _.orderBy(messageMockInboxData, ['id'])) {
      this.collectionSource.push(
        MessageInbox.register(
          new MessageInboxId(inbox.id),
          new MessageInboxRowId(inbox.rowId),
          new MessageInboxTenantIds(inbox.tenantIds),
          new MessageInboxMessageId(inbox.messageId),
          new MessageInboxMessageRowId(inbox.messageRowId),
          new MessageInboxAccountId(inbox.accountId),
          new MessageInboxAccountCode(inbox.accountCode),
          new MessageInboxIsImportant(inbox.isImportant),
          new MessageInboxSentAt(inbox.sentAt),
          new MessageInboxSubject(inbox.subject),
          new MessageInboxBody(inbox.body),
          new MessageInboxLink(inbox.link),
          new MessageInboxIsInternalLink(inbox.isInternalLink),
          new MessageInboxImage(inbox.image),
          new MessageInboxIcon(inbox.icon),
          new MessageInboxAttachments(inbox.attachments),
          new MessageInboxIsRead(inbox.isRead),
          new MessageInboxIsReadAtLeastOnce(inbox.isReadAtLeastOnce),
          new MessageInboxMeta(inbox.meta),
          new MessageInboxCreatedAt({ currentTimestamp: true }),
          new MessageInboxUpdatedAt({ currentTimestamp: true }),
          new MessageInboxDeletedAt(null),
        ),
      );
    }
  }
}
