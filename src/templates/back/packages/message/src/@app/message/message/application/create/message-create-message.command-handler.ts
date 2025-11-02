/* eslint-disable key-spacing */
import { MessageCreateMessageCommand } from '@app/message/message';
import { MessageCreateMessageService } from '@app/message/message/application/create/message-create-message.service';
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

@CommandHandler(MessageCreateMessageCommand)
export class MessageCreateMessageCommandHandler implements ICommandHandler<MessageCreateMessageCommand>
{
    constructor(
        private readonly createMessageService: MessageCreateMessageService,
    ) {}

    async execute(command: MessageCreateMessageCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createMessageService.main(
            {
                id: new MessageMessageId(command.payload.id),
                tenantIds: new MessageMessageTenantIds(command.payload.tenantIds),
                status: new MessageMessageStatus(command.payload.status),
                accountRecipientIds: new MessageMessageAccountRecipientIds(command.payload.accountRecipientIds),
                tenantRecipientIds: new MessageMessageTenantRecipientIds(command.payload.tenantRecipientIds),
                scopeRecipients: new MessageMessageScopeRecipients(command.payload.scopeRecipients),
                tagRecipients: new MessageMessageTagRecipients(command.payload.tagRecipients),
                sendAt: new MessageMessageSendAt(command.payload.sendAt, {}, { applyTimezone: command.cQMetadata?.timezone }),
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
