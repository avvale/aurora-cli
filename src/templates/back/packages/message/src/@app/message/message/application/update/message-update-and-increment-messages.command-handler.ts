/* eslint-disable key-spacing */
import { MessageUpdateAndIncrementMessagesCommand } from '@app/message/message';
import { MessageUpdateAndIncrementMessagesService } from '@app/message/message/application/update/message-update-and-increment-messages.service';
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

@CommandHandler(MessageUpdateAndIncrementMessagesCommand)
export class MessageUpdateAndIncrementMessagesCommandHandler implements ICommandHandler<MessageUpdateAndIncrementMessagesCommand>
{
    constructor(
        private readonly updateMessagesService: MessageUpdateAndIncrementMessagesService,
    ) {}

    async execute(command: MessageUpdateAndIncrementMessagesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateMessagesService.main(
            {
                id: new MessageMessageId(command.payload.id, { undefinable: true }),
                tenantIds: new MessageMessageTenantIds(command.payload.tenantIds),
                status: new MessageMessageStatus(command.payload.status, { undefinable: true }),
                accountRecipientIds: new MessageMessageAccountRecipientIds(command.payload.accountRecipientIds),
                tenantRecipientIds: new MessageMessageTenantRecipientIds(command.payload.tenantRecipientIds),
                scopeRecipients: new MessageMessageScopeRecipients(command.payload.scopeRecipients),
                tagRecipients: new MessageMessageTagRecipients(command.payload.tagRecipients),
                sendAt: new MessageMessageSendAt(command.payload.sendAt, {}, { removeTimezone: command.cQMetadata?.timezone }),
                isImportant: new MessageMessageIsImportant(command.payload.isImportant, { undefinable: true }),
                subject: new MessageMessageSubject(command.payload.subject, { undefinable: true }),
                body: new MessageMessageBody(command.payload.body, { undefinable: true }),
                link: new MessageMessageLink(command.payload.link),
                isInternalLink: new MessageMessageIsInternalLink(command.payload.isInternalLink),
                image: new MessageMessageImage(command.payload.image),
                icon: new MessageMessageIcon(command.payload.icon),
                attachments: new MessageMessageAttachments(command.payload.attachments),
                totalRecipients: new MessageMessageTotalRecipients(command.payload.totalRecipients, { undefinable: true }),
                reads: new MessageMessageReads(command.payload.reads, { undefinable: true }),
                meta: new MessageMessageMeta(command.payload.meta),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
