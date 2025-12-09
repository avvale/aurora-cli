/* eslint-disable key-spacing */
import { MessageUpdateOutboxesCommand } from '@app/message/outbox';
import { MessageUpdateOutboxesService } from '@app/message/outbox/application/update/message-update-outboxes.service';
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

@CommandHandler(MessageUpdateOutboxesCommand)
export class MessageUpdateOutboxesCommandHandler
    implements ICommandHandler<MessageUpdateOutboxesCommand>
{
    constructor(
        private readonly updateOutboxesService: MessageUpdateOutboxesService,
    ) {}

    async execute(command: MessageUpdateOutboxesCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.updateOutboxesService.main(
            {
                id: new MessageOutboxId(command.payload.id, {
                    undefinable: true,
                }),
                messageId: new MessageOutboxMessageId(
                    command.payload.messageId,
                    { undefinable: true },
                ),
                accountRecipientIds: new MessageOutboxAccountRecipientIds(
                    command.payload.accountRecipientIds,
                ),
                tenantRecipientIds: new MessageOutboxTenantRecipientIds(
                    command.payload.tenantRecipientIds,
                ),
                scopeRecipients: new MessageOutboxScopeRecipients(
                    command.payload.scopeRecipients,
                ),
                tagRecipients: new MessageOutboxTagRecipients(
                    command.payload.tagRecipients,
                ),
                meta: new MessageOutboxMeta(command.payload.meta),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
