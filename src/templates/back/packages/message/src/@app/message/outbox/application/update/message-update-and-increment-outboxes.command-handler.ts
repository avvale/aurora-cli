/* eslint-disable key-spacing */
import { MessageUpdateAndIncrementOutboxesCommand } from '@app/message/outbox';
import { MessageUpdateAndIncrementOutboxesService } from '@app/message/outbox/application/update/message-update-and-increment-outboxes.service';
import {
    MessageOutboxAccountRecipientIds,
    MessageOutboxId,
    MessageOutboxMessageId,
    MessageOutboxMeta,
    MessageOutboxScopeRecipients,
    MessageOutboxSort,
    MessageOutboxTagRecipients,
    MessageOutboxTenantRecipientIds,
} from '@app/message/outbox/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(MessageUpdateAndIncrementOutboxesCommand)
export class MessageUpdateAndIncrementOutboxesCommandHandler implements ICommandHandler<MessageUpdateAndIncrementOutboxesCommand>
{
    constructor(
        private readonly updateOutboxesService: MessageUpdateAndIncrementOutboxesService,
    ) {}

    async execute(command: MessageUpdateAndIncrementOutboxesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateOutboxesService.main(
            {
                id: new MessageOutboxId(command.payload.id, { undefinable: true }),
                messageId: new MessageOutboxMessageId(command.payload.messageId, { undefinable: true }),
                sort: new MessageOutboxSort(command.payload.sort, { undefinable: true }),
                accountRecipientIds: new MessageOutboxAccountRecipientIds(command.payload.accountRecipientIds),
                tenantRecipientIds: new MessageOutboxTenantRecipientIds(command.payload.tenantRecipientIds),
                scopeRecipients: new MessageOutboxScopeRecipients(command.payload.scopeRecipients),
                tagRecipients: new MessageOutboxTagRecipients(command.payload.tagRecipients),
                meta: new MessageOutboxMeta(command.payload.meta),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
