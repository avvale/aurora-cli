/* eslint-disable key-spacing */
import { MessageUpsertMessageCommand } from '@app/message/message';
import { MessageUpsertMessageService } from '@app/message/message/application/upsert/message-upsert-message.service';
import {
    MessageMessageAccountRecipientIds,
    MessageMessageAttachments,
    MessageMessageBody,
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
} from '@app/message/message/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(MessageUpsertMessageCommand)
export class MessageUpsertMessageCommandHandler implements ICommandHandler<MessageUpsertMessageCommand>
{
    constructor(
        private readonly upsertMessageService: MessageUpsertMessageService,
    ) {}

    async execute(command: MessageUpsertMessageCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertMessageService.main(
            {
                id: new MessageMessageId(command.payload.id),
                tenantIds: new MessageMessageTenantIds(command.payload.tenantIds),
                status: new MessageMessageStatus(command.payload.status),
                accountRecipientIds: new MessageMessageAccountRecipientIds(command.payload.accountRecipientIds),
                tenantRecipientIds: new MessageMessageTenantRecipientIds(command.payload.tenantRecipientIds),
                scopeRecipients: new MessageMessageScopeRecipients(command.payload.scopeRecipients),
                tagRecipients: new MessageMessageTagRecipients(command.payload.tagRecipients),
                sendAt: new MessageMessageSendAt(command.payload.sendAt, {}, { removeTimezone: command.cQMetadata?.timezone }),
                isImportant: new MessageMessageIsImportant(command.payload.isImportant),
                subject: new MessageMessageSubject(command.payload.subject),
                body: new MessageMessageBody(command.payload.body),
                link: new MessageMessageLink(command.payload.link),
                isInternalLink: new MessageMessageIsInternalLink(command.payload.isInternalLink),
                image: new MessageMessageImage(command.payload.image),
                icon: new MessageMessageIcon(command.payload.icon),
                attachments: new MessageMessageAttachments(command.payload.attachments),
                totalRecipients: new MessageMessageTotalRecipients(command.payload.totalRecipients),
                reads: new MessageMessageReads(command.payload.reads),
                meta: new MessageMessageMeta(command.payload.meta),
            },
            command.cQMetadata,
        );
    }
}
