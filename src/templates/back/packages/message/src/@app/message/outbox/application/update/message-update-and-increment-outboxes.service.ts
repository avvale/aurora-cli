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
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class MessageUpdateAndIncrementOutboxesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: MessageIOutboxRepository,
    ) {}

    async main(
        payload: {
            id?: MessageOutboxId;
            messageId?: MessageOutboxMessageId;
            sort?: MessageOutboxSort;
            accountRecipientIds?: MessageOutboxAccountRecipientIds;
            tenantRecipientIds?: MessageOutboxTenantRecipientIds;
            scopeRecipients?: MessageOutboxScopeRecipients;
            tagRecipients?: MessageOutboxTagRecipients;
            meta?: MessageOutboxMeta;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const outbox = MessageOutbox.register(
            payload.id,
            payload.messageId,
            payload.sort,
            payload.accountRecipientIds,
            payload.tenantRecipientIds,
            payload.scopeRecipients,
            payload.tagRecipients,
            payload.meta,
            null, // createdAt
            new MessageOutboxUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update and increment
        await this.repository.updateAndIncrement(
            outbox,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateAndIncrementOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const outboxes = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const outboxesRegister = this.publisher.mergeObjectContext(
            new MessageAddOutboxesContextEvent(outboxes),
        );

        outboxesRegister.updatedAndIncremented(); // apply event to model events
        outboxesRegister.commit(); // commit all events of model
    }
}
