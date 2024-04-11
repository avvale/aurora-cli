/* eslint-disable key-spacing */
import { MessageUpsertOutboxCommand } from '@app/message/outbox';
import { MessageUpsertOutboxService } from '@app/message/outbox/application/upsert/message-upsert-outbox.service';
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

@CommandHandler(MessageUpsertOutboxCommand)
export class MessageUpsertOutboxCommandHandler implements ICommandHandler<MessageUpsertOutboxCommand>
{
    constructor(
        private readonly upsertOutboxService: MessageUpsertOutboxService,
    ) {}

    async execute(command: MessageUpsertOutboxCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertOutboxService.main(
            {
                id: new MessageOutboxId(command.payload.id),
                messageId: new MessageOutboxMessageId(command.payload.messageId),
                sort: new MessageOutboxSort(command.payload.sort),
                accountRecipientIds: new MessageOutboxAccountRecipientIds(command.payload.accountRecipientIds),
                tenantRecipientIds: new MessageOutboxTenantRecipientIds(command.payload.tenantRecipientIds),
                scopeRecipients: new MessageOutboxScopeRecipients(command.payload.scopeRecipients),
                tagRecipients: new MessageOutboxTagRecipients(command.payload.tagRecipients),
                meta: new MessageOutboxMeta(command.payload.meta),
            },
            command.cQMetadata,
        );
    }
}
