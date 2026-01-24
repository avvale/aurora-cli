import {
  MessageAddMessagesContextEvent,
  MessageIMessageRepository,
  MessageMessage,
} from '@app/message/message';
import {
  MessageMessageAccountRecipientIds,
  MessageMessageAttachments,
  MessageMessageBody,
  MessageMessageCreatedAt,
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
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class MessageCreateMessagesService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: MessageIMessageRepository,
  ) {}

  async main(
    payload: {
      id: MessageMessageId;
      tenantIds: MessageMessageTenantIds;
      status: MessageMessageStatus;
      accountRecipientIds: MessageMessageAccountRecipientIds;
      tenantRecipientIds: MessageMessageTenantRecipientIds;
      scopeRecipients: MessageMessageScopeRecipients;
      tagRecipients: MessageMessageTagRecipients;
      sendAt: MessageMessageSendAt;
      isImportant: MessageMessageIsImportant;
      subject: MessageMessageSubject;
      body: MessageMessageBody;
      link: MessageMessageLink;
      isInternalLink: MessageMessageIsInternalLink;
      image: MessageMessageImage;
      icon: MessageMessageIcon;
      attachments: MessageMessageAttachments;
      totalRecipients: MessageMessageTotalRecipients;
      reads: MessageMessageReads;
      meta: MessageMessageMeta;
    }[],
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const messages = payload.map((message) =>
      MessageMessage.register(
        message.id,
        undefined, // rowId
        message.tenantIds,
        message.status,
        message.accountRecipientIds,
        message.tenantRecipientIds,
        message.scopeRecipients,
        message.tagRecipients,
        message.sendAt,
        message.isImportant,
        message.subject,
        message.body,
        message.link,
        message.isInternalLink,
        message.image,
        message.icon,
        message.attachments,
        message.totalRecipients,
        message.reads,
        message.meta,
        new MessageMessageCreatedAt({ currentTimestamp: true }),
        new MessageMessageUpdatedAt({ currentTimestamp: true }),
        null, // deleteAt
      ),
    );

    // insert
    await this.repository.insert(messages, {
      insertOptions: cQMetadata?.repositoryOptions,
    });

    // create AddMessagesContextEvent to have object wrapper to add event publisher functionality
    // insert EventBus in object, to be able to apply and commit events
    const messagesRegistered = this.publisher.mergeObjectContext(
      new MessageAddMessagesContextEvent(messages, cQMetadata),
    );

    messagesRegistered.created(); // apply event to model events
    messagesRegistered.commit(); // commit all events of model
  }
}
