/* eslint-disable key-spacing */
import { MessageCreateInboxCommand } from '@app/message/inbox';
import { MessageCreateInboxService } from '@app/message/inbox/application/create/message-create-inbox.service';
import {
    MessageInboxAccountCode,
    MessageInboxAccountId,
    MessageInboxAttachments,
    MessageInboxBody,
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
    MessageInboxSentAt,
    MessageInboxSubject,
    MessageInboxTenantIds,
} from '@app/message/inbox/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(MessageCreateInboxCommand)
export class MessageCreateInboxCommandHandler
    implements ICommandHandler<MessageCreateInboxCommand>
{
    constructor(
        private readonly createInboxService: MessageCreateInboxService,
    ) {}

    async execute(command: MessageCreateInboxCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.createInboxService.main(
            {
                id: new MessageInboxId(command.payload.id),
                tenantIds: new MessageInboxTenantIds(command.payload.tenantIds),
                messageId: new MessageInboxMessageId(command.payload.messageId),
                messageRowId: new MessageInboxMessageRowId(
                    command.payload.messageRowId,
                ),
                accountId: new MessageInboxAccountId(command.payload.accountId),
                accountCode: new MessageInboxAccountCode(
                    command.payload.accountCode,
                ),
                isImportant: new MessageInboxIsImportant(
                    command.payload.isImportant,
                ),
                sentAt: new MessageInboxSentAt(
                    command.payload.sentAt,
                    {},
                    { applyTimezone: command.cQMetadata?.timezone },
                ),
                subject: new MessageInboxSubject(command.payload.subject),
                body: new MessageInboxBody(command.payload.body),
                link: new MessageInboxLink(command.payload.link),
                isInternalLink: new MessageInboxIsInternalLink(
                    command.payload.isInternalLink,
                ),
                image: new MessageInboxImage(command.payload.image),
                icon: new MessageInboxIcon(command.payload.icon),
                attachments: new MessageInboxAttachments(
                    command.payload.attachments,
                ),
                isRead: new MessageInboxIsRead(command.payload.isRead),
                isReadAtLeastOnce: new MessageInboxIsReadAtLeastOnce(
                    command.payload.isReadAtLeastOnce,
                ),
                meta: new MessageInboxMeta(command.payload.meta),
            },
            command.cQMetadata,
        );
    }
}
