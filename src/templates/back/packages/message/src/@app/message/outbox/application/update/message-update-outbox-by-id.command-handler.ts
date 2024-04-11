/* eslint-disable key-spacing */
import { MessageUpdateOutboxByIdCommand } from '@app/message/outbox';
import { MessageUpdateOutboxByIdService } from '@app/message/outbox/application/update/message-update-outbox-by-id.service';
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

@CommandHandler(MessageUpdateOutboxByIdCommand)
export class MessageUpdateOutboxByIdCommandHandler implements ICommandHandler<MessageUpdateOutboxByIdCommand>
{
    constructor(
        private readonly updateOutboxByIdService: MessageUpdateOutboxByIdService,
    ) {}

    async execute(command: MessageUpdateOutboxByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateOutboxByIdService.main(
            {
                id: new MessageOutboxId(command.payload.id),
                messageId: new MessageOutboxMessageId(command.payload.messageId, { undefinable: true }),
                sort: new MessageOutboxSort(command.payload.sort, { undefinable: true }),
                accountRecipientIds: new MessageOutboxAccountRecipientIds(command.payload.accountRecipientIds),
                tenantRecipientIds: new MessageOutboxTenantRecipientIds(command.payload.tenantRecipientIds),
                scopeRecipients: new MessageOutboxScopeRecipients(command.payload.scopeRecipients),
                tagRecipients: new MessageOutboxTagRecipients(command.payload.tagRecipients),
                meta: new MessageOutboxMeta(command.payload.meta),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
