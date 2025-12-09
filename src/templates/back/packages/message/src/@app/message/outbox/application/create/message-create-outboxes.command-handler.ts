/* eslint-disable key-spacing */
import { MessageCreateOutboxesCommand } from '@app/message/outbox';
import { MessageCreateOutboxesService } from '@app/message/outbox/application/create/message-create-outboxes.service';
import {
    MessageOutboxAccountRecipientIds,
    MessageOutboxId,
    MessageOutboxMessageId,
    MessageOutboxMeta,
    MessageOutboxScopeRecipients,
    MessageOutboxTagRecipients,
    MessageOutboxTenantRecipientIds,
} from '@app/message/outbox/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(MessageCreateOutboxesCommand)
export class MessageCreateOutboxesCommandHandler
    implements ICommandHandler<MessageCreateOutboxesCommand>
{
    constructor(
        private readonly createOutboxesService: MessageCreateOutboxesService,
    ) {}

    async execute(command: MessageCreateOutboxesCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.createOutboxesService.main(
            command.payload.map((outbox) => {
                return {
                    id: new MessageOutboxId(outbox.id),
                    messageId: new MessageOutboxMessageId(outbox.messageId),
                    accountRecipientIds: new MessageOutboxAccountRecipientIds(
                        outbox.accountRecipientIds,
                    ),
                    tenantRecipientIds: new MessageOutboxTenantRecipientIds(
                        outbox.tenantRecipientIds,
                    ),
                    scopeRecipients: new MessageOutboxScopeRecipients(
                        outbox.scopeRecipients,
                    ),
                    tagRecipients: new MessageOutboxTagRecipients(
                        outbox.tagRecipients,
                    ),
                    meta: new MessageOutboxMeta(outbox.meta),
                };
            }),
            command.cQMetadata,
        );
    }
}
