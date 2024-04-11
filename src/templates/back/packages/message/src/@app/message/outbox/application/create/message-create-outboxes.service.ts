import { MessageAddOutboxesContextEvent, MessageIOutboxRepository, MessageOutbox } from '@app/message/outbox';
import {
    MessageOutboxAccountRecipientIds,
    MessageOutboxCreatedAt,
    MessageOutboxDeletedAt,
    MessageOutboxId,
    MessageOutboxMessageId,
    MessageOutboxMeta,
    MessageOutboxScopeRecipients,
    MessageOutboxSort,
    MessageOutboxTagRecipients,
    MessageOutboxTenantRecipientIds,
    MessageOutboxUpdatedAt,
} from '@app/message/outbox/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class MessageCreateOutboxesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: MessageIOutboxRepository,
    ) {}

    async main(
        payload: {
            id: MessageOutboxId;
            messageId: MessageOutboxMessageId;
            accountRecipientIds: MessageOutboxAccountRecipientIds;
            tenantRecipientIds: MessageOutboxTenantRecipientIds;
            scopeRecipients: MessageOutboxScopeRecipients;
            tagRecipients: MessageOutboxTagRecipients;
            meta: MessageOutboxMeta;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateOutboxes = payload.map(outbox => MessageOutbox.register(
            outbox.id,
            outbox.messageId,
            new MessageOutboxSort(undefined, { undefinable: true }), // sort is auto increment
            outbox.accountRecipientIds,
            outbox.tenantRecipientIds,
            outbox.scopeRecipients,
            outbox.tagRecipients,
            outbox.meta,
            new MessageOutboxCreatedAt({ currentTimestamp: true }),
            new MessageOutboxUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateOutboxes,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddOutboxesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const outboxesRegistered = this.publisher.mergeObjectContext(new MessageAddOutboxesContextEvent(aggregateOutboxes));

        outboxesRegistered.created(); // apply event to model events
        outboxesRegistered.commit(); // commit all events of model
    }
}
