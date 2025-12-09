/* eslint-disable key-spacing */
import { MessageCreateInboxesCommand } from '@app/message/inbox';
import { MessageCreateInboxesService } from '@app/message/inbox/application/create/message-create-inboxes.service';
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

@CommandHandler(MessageCreateInboxesCommand)
export class MessageCreateInboxesCommandHandler
    implements ICommandHandler<MessageCreateInboxesCommand>
{
    constructor(
        private readonly createInboxesService: MessageCreateInboxesService,
    ) {}

    async execute(command: MessageCreateInboxesCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.createInboxesService.main(
            command.payload.map((inbox) => {
                return {
                    id: new MessageInboxId(inbox.id),
                    tenantIds: new MessageInboxTenantIds(inbox.tenantIds),
                    messageId: new MessageInboxMessageId(inbox.messageId),
                    messageRowId: new MessageInboxMessageRowId(
                        inbox.messageRowId,
                    ),
                    accountId: new MessageInboxAccountId(inbox.accountId),
                    accountCode: new MessageInboxAccountCode(inbox.accountCode),
                    isImportant: new MessageInboxIsImportant(inbox.isImportant),
                    sentAt: new MessageInboxSentAt(
                        inbox.sentAt,
                        {},
                        { applyTimezone: command.cQMetadata?.timezone },
                    ),
                    subject: new MessageInboxSubject(inbox.subject),
                    body: new MessageInboxBody(inbox.body),
                    link: new MessageInboxLink(inbox.link),
                    isInternalLink: new MessageInboxIsInternalLink(
                        inbox.isInternalLink,
                    ),
                    image: new MessageInboxImage(inbox.image),
                    icon: new MessageInboxIcon(inbox.icon),
                    attachments: new MessageInboxAttachments(inbox.attachments),
                    isRead: new MessageInboxIsRead(inbox.isRead),
                    isReadAtLeastOnce: new MessageInboxIsReadAtLeastOnce(
                        inbox.isReadAtLeastOnce,
                    ),
                    meta: new MessageInboxMeta(inbox.meta),
                };
            }),
            command.cQMetadata,
        );
    }
}
