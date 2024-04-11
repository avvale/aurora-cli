/* eslint-disable key-spacing */
import { MessageUpdateAndIncrementInboxesCommand } from '@app/message/inbox';
import { MessageUpdateAndIncrementInboxesService } from '@app/message/inbox/application/update/message-update-and-increment-inboxes.service';
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
    MessageInboxMeta,
    MessageInboxSentAt,
    MessageInboxSort,
    MessageInboxSubject,
    MessageInboxTenantIds,
} from '@app/message/inbox/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(MessageUpdateAndIncrementInboxesCommand)
export class MessageUpdateAndIncrementInboxesCommandHandler implements ICommandHandler<MessageUpdateAndIncrementInboxesCommand>
{
    constructor(
        private readonly updateInboxesService: MessageUpdateAndIncrementInboxesService,
    ) {}

    async execute(command: MessageUpdateAndIncrementInboxesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateInboxesService.main(
            {
                id: new MessageInboxId(command.payload.id, { undefinable: true }),
                tenantIds: new MessageInboxTenantIds(command.payload.tenantIds),
                messageId: new MessageInboxMessageId(command.payload.messageId),
                sort: new MessageInboxSort(command.payload.sort, { undefinable: true }),
                accountId: new MessageInboxAccountId(command.payload.accountId, { undefinable: true }),
                accountCode: new MessageInboxAccountCode(command.payload.accountCode),
                isImportant: new MessageInboxIsImportant(command.payload.isImportant, { undefinable: true }),
                sentAt: new MessageInboxSentAt(command.payload.sentAt, { undefinable: true }, { removeTimezone: command.cQMetadata?.timezone }),
                subject: new MessageInboxSubject(command.payload.subject, { undefinable: true }),
                body: new MessageInboxBody(command.payload.body, { undefinable: true }),
                link: new MessageInboxLink(command.payload.link),
                isInternalLink: new MessageInboxIsInternalLink(command.payload.isInternalLink),
                image: new MessageInboxImage(command.payload.image),
                icon: new MessageInboxIcon(command.payload.icon),
                attachments: new MessageInboxAttachments(command.payload.attachments),
                isRead: new MessageInboxIsRead(command.payload.isRead, { undefinable: true }),
                isReadAtLeastOnce: new MessageInboxIsReadAtLeastOnce(command.payload.isReadAtLeastOnce, { undefinable: true }),
                meta: new MessageInboxMeta(command.payload.meta),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
